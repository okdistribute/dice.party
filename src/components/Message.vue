<template>
  <div class="message">
    <span class="character-name">
      {{ message.name }}
    </span>
    rolled
    <span class="stat-name">
    {{ message.stat }}:
    </span>
    <span>
      [
      <span v-for="(die, idx) in message.result.dice" :key="idx">
        <template v-if="idx > 0">, </template>
        <span :class="die < 0 ? 'dropped-die' : ''">
          {{ Math.abs(die) }}
        </span>
      </span>
      ]
    </span>
    <template v-if="message.stat">
      {{ message.modifier &lt; 0 ? '\u2212' : '+' }}
      <span class="modifier">
        {{ Math.abs(message.modifier) || 0 }}
      </span>
    </template>
    =
    <span class="result">
      {{ message.result.value + (message.modifier || 0) }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style scoped>
.message {
  line-height: 1.66;
}

.stat-name {
  text-transform: uppercase;
}

.result {
  font-weight: bold;
}

.dropped-die {
  /* text-decoration: line-through; */
  opacity: .33;
}
</style>