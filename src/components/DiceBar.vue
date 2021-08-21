<template>
  <div class="dicebar">
    <button class="primary" @click="roll(stat, '3d6kl2')">&minus;</button>
    <button class="primary" @click="roll(stat, '2d6')">2d6</button>
    <button class="primary" @click="roll(stat, '3d6kh2')">+</button>
  </div>
</template>

<script>
export default {
  props: ['stat'],
  methods: {
    roll(stat, diceSpec) {
      this.$emit('roll', stat, diceSpec)
    },
  },
}
</script>

<style scoped>
.dicebar {
  display: inline-block;
}

button:first-child {
  border-right: 1px solid darkblue;
}

button:not(:first-child) {
  margin-left: 0;
}

button:not(:last-child) {
  margin-right: 0;
}

button:last-child {
    border-left: 1px solid darkblue;
}
</style>
