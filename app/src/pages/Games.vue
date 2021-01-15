<template>
  <section class="games container">
    <games-player
      :game="game"
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
      game: null
    }
  },

  methods: {
    async select(component) {
      this.game = component;
    },

    close() {
      this.game = null;
    }
  }
}
</script>