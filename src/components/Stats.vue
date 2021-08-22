<template>
  <div class="stats">
    <div class="row">
      <form @submit.prevent="submitStat">
        <label for="new-stat-name">Add stat</label>
        <input
          name="new-stat-name"
          id="new-stat-name"
          type="text"
          v-model="newStatName"
        />
        <input
          class="small tertiary"
          type="submit"
          value="+"
          :disabled="submitDisabled"
        />
      </form>
    </div>
    <div class="stat-grid">
      <template class="stat-row" v-for="(stat, idx) in stats" :key="stat.name">
        <button
          class="small secondary"
          @click="removeStat(idx)"
          title="Remove stat"
        >
          &times;
        </button>
        <div class="stat-name-wrapper">
          <span class="stat-name">{{ stat.name }}</span>
        </div>
        <input
          class="stat-modifier"
          name="modifier"
          type="number"
          min="-5"
          max="5"
          v-model="stat.modifier"
          @change="saveStats()"
        />
        <dice-bar :stat="stat" @roll="roll" />
      </template>
    </div>
  </div>
</template>

<script>
import DiceBar from './DiceBar.vue'

export default {
  emits: ['roll'],
  components: { DiceBar },
  data: () => ({
    newStatName: '',
    stats: [],
  }),
  computed: {
    submitDisabled() { return !this.newStatName }
  },
  methods: {
    addStat(name, modifier) {
      this.stats.push({ name, modifier })
    },
    removeStat(index) {
      this.stats.splice(index, 1)
    },
    submitStat() {
      this.stats.push({ name: this.newStatName, modifier: 0 })
    },
    loadStats() {
      const savedStats = JSON.parse(localStorage.getItem('stats'))
      if (savedStats) {
        this.stats.length = 0
        Array.prototype.push.apply(this.stats, savedStats)
      }
    },
    saveStats() {
      console.debug('Save stats')
      localStorage.setItem('stats', JSON.stringify(this.stats))
    },
    roll(stat, diceSpec) {
      this.$emit('roll', stat, diceSpec)
    },
  },
  created() {
    this.loadStats()
  },
  watch: {
    stats: {
      /* Need the watcher for add/remove stats, @change for values */
      deep: true,
      handler() {
        this.saveStats()
      },
    },
  },
}
</script>

<style scoped>
.stats {
  max-width: 28em;
}

.stat-modifier {
  width: 4em;
}

.stat-grid {
  display: grid;
  grid-template-columns: min-content auto min-content max-content;
}

.stat-name-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.stat-name {
  font-size: x-large;
  margin-right: 0.5em;
}
</style>
