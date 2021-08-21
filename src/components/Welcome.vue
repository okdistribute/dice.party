<template>
  <div class="container">
    <div class="row">
      <h1 class="jumbo">dice.party</h1>
    </div>

    <div class="row">
      <form>
        <label for="roomname">Room Name</label>
        <input type="text" id="roomname" />
        <input type="submit" class="primary" value="Go!" />
      </form>
    </div>

    <div class="row">
      <div class="text">
        <p>
          Type in a name and click "Go!" to make your own room where you can
          roll dice.
        </p>
        <p>
          Your friends can join you by typing the same room name, or you can
          send them the link from the address bar.
        </p>
      </div>
    </div>
  </div>
  <!-- .container -->
</template>

<script>
export default {
  name: "Welcome",
  props: {},
};
</script>

<style lang="scss" scoped>
.jumbo {
  font-size: 60pt;
}

.monospace {
  font-family: monospace;
}

.text {
  margin-top: 1em;
  max-width: 40em;
}

.row {
  justify-content: center;
}
</style>