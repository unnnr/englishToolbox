<template>
  <iframe 
    class="player__content" 
    frameborder="0"
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    :src="src"
    allowfullscreen/>
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

    src() {
      return this.videoId ? 
        'https://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&color=white' : null;
    }
  }
}
</script>