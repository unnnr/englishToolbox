<template>
  <section class="games container">
    <div class="games__selected">
      <whiteboard/>
    </div>

    <games-pool/>
  </section>
</template>

<script>
import Whiteboard from '@components/games/Whiteboard'
import GamesPool from '@pages/games/GamesPool.vue'

export default {
  components: {
    Whiteboard,
    GamesPool
  }
}
</script>