<template>
  <div class="player">
    <post-player-overlay/> 

      <iframe class="player__content" src="https://www.youtube.com/embed/yY7iGa4t9-I" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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