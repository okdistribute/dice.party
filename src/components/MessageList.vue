<template>
  <div class="messages">
    <div
      v-if="!eventSourceReady || eventSourceError"
      class="spinner primary"
      title="Connecting to server..."
    ></div>
    <div v-if="eventSourceReady && !messageList.length">
      No dice rolls yet. Be the first!
    </div>
    <Message
      v-for="message in messageList"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
import LocalRed from 'localred'

let red = LocalRed()

export default {
  name: 'MessageList',
  props: ['slug'],
  components: {
    Message,
  },
  data: () => ({
    messageList: [],
    eventSource: undefined,
    eventSourceReady: false,
    eventSourceError: undefined,
  }),
  computed: {},
  methods: {
    addMessage(msg) {
      let parsed = JSON.parse(msg)
      if (!this.messageList.some((d) => d.id == parsed.id)) {
          console.log('adding message', parsed)
        this.messageList.unshift(parsed)
      }
    },
    initEventStream() {
      console.debug('Opening eventSource from', this.slug)
      red.load(this.slug).then(() => {
        let messages = red.lrange(this.slug, 0, 20)
        messages.forEach(this.addMessage)
        this.eventSource = red.watch(this.slug)
        this.eventSource.on('open', () => {
            console.log('EventSource open')
            this.eventSourceReady = true
        })
        this.eventSource.on('error', (e) => {
            console.error('EventSource error', e)
            this.eventSourceError = e
        })
        this.eventSource.on('message', this.addMessage)
       })
    },
  },
  created() {
    this.initEventStream()
  },
  beforeUnmount() {
    console.debug('Close eventSource')
    red.close(this.slug)
  },
}
</script>

<style>
.messages {
  padding: 1em;
}
</style>
