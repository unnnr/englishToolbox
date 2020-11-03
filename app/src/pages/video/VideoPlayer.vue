<template>
  <div class="player">    
    <transition name="fade">

     <img 
      v-if="overlayShown"
      class="player__overlay"
      src="img/svg/overlay-videos.svg">

    <iframe 
      v-else
      class="player__content" 
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      :src="link"
      allowfullscreen/>

    </transition>
  </div>
</template>

<script>
export default {
  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    videoId() {
      return this.target ? this.target.videoId : null;
    },

    link() {
      let path =  'https://www.youtube.com/embed/';
      let query = '?enablejsapi=1&color=white';

      return this.videoId && path + this.videoId + query;
    },

    overlayShown() {
      return !!!this.videoId;
    },
  }
}
</script>

<style lang="sass">

.player__overlay
  display: block

.fade-leave-active.player__overlay
  transition-delay: .55s !important
</style>