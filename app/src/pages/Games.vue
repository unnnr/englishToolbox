<template>
  <section class="games container">
    <games-player
      :game="game"/>
    
    <games-pool/>
  </section>
</template>

<script>
import Whiteboard from '@components/games/Whiteboard'
import GamesPlayer from '@pages/games/GamesPlayer.vue'
import GamesPool from '@pages/games/GamesPool.vue'

export default {
  components: {
    GamesPlayer,
    GamesPool
  },

  data() {
    return {
      game: Whiteboard
    }
  },

  methods: {
    select() {

    }
  }
}
</script>