<template>
  <div class="roll-control">
    <div class="stat-grid">
      <div class="char-name-wrapper">
        <label for="char-name">Character Name</label>
        <input
          type="text"
          id="char-name"
          ref="nameInput"
          :class="{ danger: nameWarning }"
          v-model="name"
          @change="nameWarning = false"
        />
      </div>
      <dice-bar @roll="roll" style="align-self: end" />
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
  props: ['slug'],
  components: { DiceBar },
  data: () => ({
    name: '',
    nameWarning: false,
    stats: [],
  }),
  computed: {
    nameKey() {
      return `${this.slug}:charName`
    },
    statKey() {
      return `${this.slug}:stats`
    },
    messageUrl() {
      return `${this.$messageHost}/${this.slug}/messages`
    },
  },
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
      console.log(this.statKey, localStorage.getItem(this.statKey))
      const savedStats = JSON.parse(localStorage.getItem(this.statKey))
      if (savedStats) {
        this.stats.length = 0
        Array.prototype.push.apply(this.stats, savedStats)
      }
    },
    saveStats() {
      console.debug('Save stats')
      localStorage.setItem(this.statKey, JSON.stringify(this.stats))
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
      if (!this.name) {
        this.nameWarning = true
        this.$refs.nameInput.focus()
        return
      }
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
  created() {
    this.name = localStorage.getItem(this.nameKey) || ''
    this.loadStats()
  },
  watch: {
    name(val) {
      localStorage.setItem(this.nameKey, val)
    },
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

<style>
.roll-control {
  max-width: 28em;
}
</style>

<style scoped>
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

.char-name-wrapper {
  grid-column: 1/4;
  margin-bottom: 4px;
}

.danger {
  border-color: #dc3545;
  background-color: pink;
}

button.small {
  font-size: larger;
}
</style>
