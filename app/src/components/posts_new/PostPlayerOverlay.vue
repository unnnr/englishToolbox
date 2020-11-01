<template>
  <transition name="fade">
    <img 
      class="player__overlay"
      :key="key"
      :src="link"/>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  props: {
    editing: { type: Boolean, default: false },
  },

  computed: {
    empty() {
      return !!!this.editing;
    },

    key() {
      if (this.editing)
        return 0;
      
      return 1;
    },


    link() {
      if (this.editing)
        return 'img/svg/overlay-videos.svg';

      return 'img/svg/overlay-selected.svg';
    }
  }
}
</script>

<style scoped>
.player__overlay {
  display: block;
}

</style>