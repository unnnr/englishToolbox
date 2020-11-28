<template>
  <div class="player">    
    <transition name="fade">

    <div 
      v-if="overlayShown"
      class="player__overlay"
      :style="{'background-image': imageUrl}">
    </div>

    <iframe 
      v-else
      class="player__content" 
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      :src="videoLink"
      allowfullscreen/>

    </transition>
  </div>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'

export default {
  mixins: [ HandleEvents ],

  inject: [ '$target' ],

  data() {
    return {
      img: '/img/svg/overlay-videos.svg',
      preview: null 
    }
  },

  mounted() {
    this.listen({'preview-changed':
      event => this.preview = event.videoId })
  },

  computed: {
    target() {
      return this.$target();
    },

    videoId() {
      if (this.preview)
        return this.preview;

      if (this.target && this.target.youtubeId)
        return this.target.youtubeId;
      
      return null;
    },

    videoLink() {
      let path = 'https://www.youtube.com/embed/';
      let query = '?enablejsapi=1&color=white';

      return this.videoId && path + this.videoId + query;
    },

    imageUrl() {
      return 'url(' + window.origin  + this.img + ')';
    },

    overlayShown() {
      return !!!this.videoId;
    }
  }
}
</script>
