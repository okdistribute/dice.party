<template>
  <Welcome />
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Welcome from './components/Welcome.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Welcome
  }
}
</script>

<style lang="scss">
@import '../node_modules/mini.css/src/flavors/mini-default.scss'
</style>
