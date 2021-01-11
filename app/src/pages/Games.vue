<template>
  <section class="games container">
    <games-player
      :game="game"/>
    
    <games-pool
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
    }
  }
}
</script>