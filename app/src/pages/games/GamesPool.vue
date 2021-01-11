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
        { name: 'Whiteboard', loader: () => import('@components/games/Whiteboard') },
        { name: 'Recorder', loader: () => import('@components/games/Recorder') },
        { name: 'Matcher', loader: () => import('@components/games/Matcher') },
        { name: 'Builder', loader: () => import('@components/games/Builder') },
        { name: 'Bubbles', loader: () => import('@components/games/Bubbles') },
        { name: 'Verbs', loader: () => import('@components/games/Verbs') },
      ],

      color: randomRgb()
    }
  },

  mounted() {
    this.select(this.games[4]);
  },

  methods: {
    async select(game) {
      let module = await game.loader();
      let component = module.default;

      this.$emit('select', component);
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
  height: 32px
  font-size: 18px
  border-radius: 20px
  background: #f0f0f0
  padding: 0 14px 
  color: white

</style>