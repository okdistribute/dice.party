<template>
  <div class="control">
    <label for="charName">Character Name</label>
    <input type="text" id="charName" v-model="name" />
    <dice-bar @roll="roll" />
  </div>
</template>

<script>
import DiceBar from './DiceBar.vue'
function postJson(url, body) {
  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
}

export default {
  components: { DiceBar },
  name: 'RollControl',
  props: ['slug'],
  data: () => ({
    name: '',
  }),
  computed: {
    messageUrl() {
      return `${this.$messageHost}/${this.slug}/messages`
    },
  },
  methods: {
    roll(stat, diceSpec) {
      if (!this.name) return
      const data = {
        name: this.name,
        stat: stat?.name,
        roll: diceSpec,
      }
      if (stat?.modifier) {
        data.modifier = Number(stat.modifier)
      }
      console.debug('Sending', data)
      postJson(this.messageUrl, data)
    },
  },
  watch: {
    name(val) {
      localStorage.setItem('charName', val)
    },
    stats: {
      /* Need the watcher for add/remove stats, @change for values */
      deep: false,
      handler() {
        console.log('Set stats')
        localStorage.setItem('stats', JSON.stringify(this.stats))
      },
    },
  },
  created() {
    this.name = localStorage.getItem('charName')
  },
}
</script>

<style scoped></style>
