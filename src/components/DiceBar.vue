<template>
  <div class="dicebar">
    <button
      class="primary"
      @click="roll(stat, '3d6kl2')"
      title="Roll 3 and take the LOWEST"
    >
      &minus;
    </button>
    <button class="primary" @click="roll(stat, '2d6')" title="Roll 2 dice">
      2d6
    </button>
    <button
      class="primary"
      @click="roll(stat, '3d6kh2')"
      title="Roll 3 and take the HIGHEST"
    >
      +
    </button>
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

<style>
.dicebar {
  display: inline-block;
  margin: 8px;
}
</style>

<style scoped>
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

button {
  margin: 0;
}
</style>
