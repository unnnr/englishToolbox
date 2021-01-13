<template>
  <div class="games__pool pool">

    <card
      v-for="(game, index) of games"
      :key="index"

      :loading="false"
      :title="game.name"

      :selected="isSelected(game)"
      :image="game.image"
      @select="select(game)"/>

  </div>
</template>

<script>
import Card from '@components/cards/EmptyCard'

function randomColor() {
  return '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0')
}

function randomRgb() {
  return [1, 2, 3].map(() => Math.floor(Math.random() * 250));
}

export default {
  components: {
    Card
  },
  
  data() {
    return {
      games: [
        { name: 'Whiteboard', loader: () => import('@components/games/Whiteboard'), image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Recorder',   loader: () => import('@components/games/Recorder'),   image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Matcher',    loader: () => import('@components/games/Matcher'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Builder',    loader: () => import('@components/games/Builder'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Bubbles',    loader: () => import('@components/games/Bubbles'),    image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
        { name: 'Verbs',      loader: () => import('@components/games/Verbs'),      image: 'https://i.ytimg.com/vi/TVoGKvVBC6Q/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA9f1IunybABCyFGmRRvVocue5fqw' },
      ],

      selected: null,

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

      this.selected = game;
      this.$emit('select', component);
    },

    isSelected(game) {
      return this.selected === game;
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