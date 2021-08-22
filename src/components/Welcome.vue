<template>
  <div class="container">
    <div class="row">
      <h1 class="jumbo">dice.party</h1>
    </div>

    <div class="row">
      <form class="form" @submit.prevent="goToRoom">
        <label for="roomName">Room Name</label>
        <input type="text" id="roomName" v-model="roomName" />
        <div class="grower">
          <input type="submit" class="primary" value="Go!" />
        </div>
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
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[\s-_]+/, '-')
    .replace(/[^\w-]+/, '')

export default {
  name: 'Welcome',
  props: {},
  data: () => ({
    roomName: '',
  }),
  methods: {
    goToRoom() {
      this.$router.push({
        name: 'Room',
        params: {
          slug: slugify(this.roomName),
        },
      })
    },
  },
}
</script>

<style scoped>
.jumbo {
  font-size: 60pt;
  margin: 40px;
}

.row {
  justify-content: center;
}

.form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.grower {
  flex-grow: 1;
  text-align: center;
}

.text {
  margin-top: 1em;
  max-width: 40em;
}
</style>
