<template>
  <div class="stats">
    <div class="stat-grid">
      <template class="stat-row" v-for="(stat, idx) in stats" :key="idx">
        <button
          class="small secondary"
          @click="removeStat(idx)"
          title="Remove attribute"
        >
          &times;
        </button>
        <div class="stat-name-wrapper">
          <input
            v-if="stat.editing"
            class="edit-stat-name"
            type="text"
            v-model="stat.name"
            @blur="stopEditStat(stat)"
            @keypress.enter="stopEditStat(stat)"
          />
          <span
            v-else
            class="stat-name"
            :class="{ unnamed: !stat.name }"
            @click="editStat(stat, $event)"
          >
            {{ stat.name || '&lt;no name&gt;' }}
          </span>
        </div>
        <input
          class="stat-modifier"
          name="modifier"
          type="number"
          min="-5"
          max="5"
          v-model="stat.modifier"
        />
        <dice-bar :stat="stat" @roll="roll" />
      </template>
      <button class="small tertiary" title="Add an attribute" @click="newStat">
        +
      </button>
    </div>
  </div>
</template>

<script>
import DiceBar from './DiceBar.vue'

export default {
  emits: ['roll'],
  components: { DiceBar },
  data: () => ({
    stats: [],
  }),
  methods: {
    newStat() {
      this.stats.push({
        name: '',
        modifier: 0,
        editing: true,
      })
      setTimeout(() => {
        document.querySelector('.edit-stat-name').focus()
      }, 0)
    },
    addStat(name, modifier) {
      this.stats.push({ name, modifier })
    },
    removeStat(index) {
      this.stats.splice(index, 1)
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
    editStat(stat, $event) {
      console.log('edit', stat, $event)
      stat.editing = true
      const $parent = $event.target.parentElement
      setTimeout(() => {
        $parent.querySelector('.edit-stat-name').focus()
      }, 0)
    },
    stopEditStat(stat) {
      console.log('blur', stat)
      delete stat.editing
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

.edit-stat-name {
  text-align: right;
}

.unnamed {
  opacity: 0.4;
}
</style>
