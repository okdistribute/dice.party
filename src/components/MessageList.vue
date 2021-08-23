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
  computed: {
    messageUrl() {
      return `${this.$messageHost}/${this.slug}/messages`
    },
  },
  methods: {
    addMessage(msg) {
      if (!this.messageList.some((d) => d.id == msg.id)) {
        this.messageList.unshift(msg)
      }
    },
    initEventStream() {
      console.debug('Opening eventSource from', this.messageUrl)
      this.eventSource = new EventSource(this.messageUrl)
      this.eventSource.addEventListener('open', (e) => {
        console.log('EventSource open', e.target)
        this.eventSourceReady = true
      })
      this.eventSource.addEventListener('error', (e) => {
        console.error('EventSource error', e)
        this.eventSourceError = e
      })
      this.eventSource.addEventListener('message', this.messageEventHandler)
    },
    messageEventHandler(event) {
      const message = JSON.parse(event.data)
      console.debug('Message', message)
      this.addMessage(message)
    },
  },
  created() {
    this.initEventStream()
  },
  beforeUnmount() {
    console.debug('Close eventSource')
    this.eventSource.close()
  },
}
</script>

<style>
.messages {
  padding: 1em;
}
</style>
