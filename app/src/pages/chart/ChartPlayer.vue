<template>
  <div class="player">

    <div 
      class="player__content"
      :style="{'background-image': imageUrl}">
    </div>

    <transition name="fade">
      <object  
        v-if="overlayShown"
        class="player__overlay"
        :style="{'background-image': overlayUrl}">
      </object>
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
      overlay: '/img/svg/overlay-charts.svg',
      preview: null
    }
  },


  computed: {
    target() {
      return this.$target();
    },

    overlayShown() {
      return !!!this.image;
    },

    overlayUrl() {
      return 'url(' + this.overlay + ')'
    },

    image() {
      if (this.preview)
        return this.preview;

      if (this.target && this.target.image)
        return this.target.image;

      return null;
    },

    imageUrl() {
      return 'url(' + this.image + ')';
    }
  },


  mounted() {
    this.listen({'preview-changed':
      event => this.preview = event.image });
  },
}
</script>
