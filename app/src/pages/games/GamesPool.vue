<template>
  <div class="games__pool pool">

    <card
      v-for="(game, index) of games"
      :key="index"

      :loading="false"
      :title="game.name"

      :selected="isSelected(game)"
      :imageasda="game.image"
      @select="select(game)"/>

  </div>
</template>

<script>
import Card from '@components/cards/EmptyCard'

export default {
  components: {
    Card
  },

  props: {
    game: { default: null },
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
    }
  },

  methods: {
    async select(game) {
      let module = await game.loader();
      let component = module.default;

      this.selected = game;
      this.$emit('select', component);
    },

    isSelected(game) {
      return this.game === game;
    }
  }
}
</script>w