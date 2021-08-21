<template>
  <div class="container">
    <h1 class="capitalize">{{ roomName }}</h1>

    <roll-control :slug="slug" />

    <h2>Messages</h2>
    <MessageList :slug="slug"/>
  </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue'
import RollControl from '@/components/RollControl.vue'

const unslugify = (s) => s.replace('-', ' ')

export default {
  name: 'Room',
  props: ['slug'],
  components: {
    MessageList,
    RollControl,
  },
  data: () => ({
    stats: [],
  }),
  computed: {
    roomName() {
      return unslugify(this.slug)
    },
  },

}
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
