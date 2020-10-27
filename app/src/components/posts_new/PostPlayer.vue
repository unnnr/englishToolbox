<template>
  <div class="player">    
    <transition name="fade">

      <post-player-overlay v-if="overlayShown"/>
  
      <slot v-else/>

    </transition>
  </div>
</template>

<script>

import PostPlayerOverlay from '@components/posts_new/PostPlayerOverlay'

export default {
  components: {
    PostPlayerOverlay
  },
  
  data() {
    return {
      overlayShown: false
    };
  }
}
</script>

<style lang="sass">

  .fade-enter, .fade-leave-to 
    position: absolute
    
</style>