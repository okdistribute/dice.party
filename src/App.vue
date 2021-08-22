<template>
  <header id="nav">
    <router-link to="/" class="logo">dice.party</router-link>
    <router-link to="/" class="button">Home</router-link>
    <router-link to="/about" class="button">About</router-link>
  </header>
  <router-view/>
</template>

<style lang="scss">
@import '../node_modules/mini.css/src/flavors/mini-default.scss';

#nav {
  a.button {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>