<template>
  <div>
    <button
      v-for="(game, index) of games"
      :key="index"
      @click="select(game)"
      :style="{
        'background-color': computeColor(index) }">

      {{ game.name }}
    </button>
  </div>
</template>

<script>

function randomColor() {
  return '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0')
}

function randomRgb() {
  return [1, 2, 3].map(() => Math.floor(Math.random() * 250));
}

export default {
  data() {
    return {
      games: [
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
        { name: 'Whiteboard', component: '@componetns/games/Whiteboard', color: randomColor()},
      ],

      color: randomRgb()
    }
  },

  methods: {
    select(game) {
      this.$emit('select', game);
    },

    computeColor(index) {
      const STEP = 8;

      let [r, g, b] = this.color;

      let k = (this.games.length - index - 1) * STEP

      return `rgb(${r - k}, ${g - k}, ${b - k})`
    }
  }
}
</script>

<style lang="sass" scoped>

div
  padding: 20px

button
  margin: 3px 6px
  height: 40px
  font-size: 18px
  border-radius: 20px
  background: #f0f0f0
  padding: 0 10px 
  color: white

</style>