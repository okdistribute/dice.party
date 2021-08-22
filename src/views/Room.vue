<template>
  <div class="container">
    <h1 class="capitalize">{{ roomName }}</h1>

    <div class="row">
      <div class="col-md">
        <roll-control :slug="slug" />
      </div>
      <div class="col-md">
        <message-list :slug="slug"/>
      </div>
    </div>

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
