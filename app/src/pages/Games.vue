<template>
  <section class="games container">
    <games-player
      :game="component"
      @close="close"/>
    
    <games-pool
      :game="game"
      @select="select"/>
  </section>
</template>

<script>
import GamesPlayer from '@pages/games/GamesPlayer'
import GamesPool from '@pages/games/GamesPool'

export default {
  components: {
    GamesPlayer,
    GamesPool
  },

  data() {
    return {
      game: null,
      component: null
    }
  },

  methods: {
    async select(game) {
      this.game = game;

      let module = await game.loader();
      this.component = module.default;

      this.$emit('select', game);
    },

    close() {
      this.game = null;
      this.component = null;
    }
  }
}
</script>