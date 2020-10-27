<template>
  <div class="player">
    <post-player-overlay v-if="overlayShown"/> 

    <slot v-else/>
  </div>
</template>

<script>

import PostPlayerOverlay from '@components/posts_new/PostPlayerOverlay'

export default {
  components: {
    PostPlayerOverlay
  },

  computed: {
    overlayShown() {
      return false;
    }
  }
}
</script>