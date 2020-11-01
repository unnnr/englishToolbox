<template>
  <div class="player">    
    <transition name="fade">

      <post-player-overlay 
        v-if="overlayShown"
        :editing="editing"/>
  
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

  props: {
    // editing: { type: Boolean, default: false }
  },
  
  data() {
    return {
      overlayShown: true,
      editing: true
    };
  }
}
</script>

<style scoped>

.fade-enter, .fade-leave-to {
  position: absolute !important
}

</style>
