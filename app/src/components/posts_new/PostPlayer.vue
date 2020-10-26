<template>
  <div class="player">
    <post-player-overlay/> 

    <slot/>
  </div>
</template>

<script>

import PostPlayerOverlay from '@components/posts_new/PostPlayerOverlay'

export default {
  components: {
    PostPlayerOverlay
  }
}
</script>