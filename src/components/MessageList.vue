<template>
  <div class="messages">
    <Message
      v-for="message in messageList"
      :key="message.id"
      :message="message"
    />
    <div v-if="!messageList.length">
      No dice rolls yet. Be the first!
    </div>
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
      console.debug('Init', this.messageUrl)
      this.eventSource = new EventSource(this.messageUrl)
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
  }
}
</script>

<style scoped>
.messages {
  padding: 1em;
}
</style>
