<template>
  <div class="games__pool pool">

    <card
      v-for="(game, index) of games"
      class="card--game"
      :key="index"

      :loading="false"
      :title="game.name"
      :favoritable="false"

      :selected="isSelected(game)"
      :image="game.image"
      @select="select(game)"
      
      rectangular/>

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
        { name: 'Whiteboard', loader: () => import('@components/games/Whiteboard'), image: 'img/svg/whiteboard.svg' },
        { name: 'Bubbles',    loader: () => import('@components/games/Bubbles'),    image: 'img/svg/bubbles.svg' },
        { name: 'Matcher',    loader: () => import('@components/games/Matcher'),    image: 'img/svg/matcher.svg' },
        { name: 'Recorder',   loader: () => import('@components/games/Recorder'),   image: 'img/svg/recorder.svg' },
        { name: 'Builder',    loader: () => import('@components/games/Builder'),    image: 'img/svg/builder.svg' },
        { name: 'Verbs',      loader: () => import('@components/games/Verbs'),      image: 'img/svg/table.svg' },
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
</script>