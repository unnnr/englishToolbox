<template>
  <div>
    <button
      v-for="(game, index) of games"
      :key="index"
      @click="select(game)"
      :style="{
        'background-color': game.color ,
        'color': 'white' }">

      {{ game.name }}
    </button>
  </div>
</template>

<script>

function randomColor() {
  return '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0')
}

export default {
  data() {
    return {
      games: [
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()}
      ]
    }
  },

  methods: {
    select(game) {
      this.$emit('select', game);
    }
  }
}
</script>

<style lang="sass" scoped>

div
  padding: 20px

button
  height: 40px
  font-size: 18px
  border-radius: 20px
  background: #f0f0f0
  padding: 0 10px
  color: #77778e

</style>