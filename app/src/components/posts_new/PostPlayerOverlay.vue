<template>
  <transition name="fade">
    <img 
      v-if ="editing" 
      class="player__overlay"
      src="img/svg/overlay-videos.svg"/>

    <img 
      v-if ="empty" 
      class="player__overlay" 
      src="img/svg/overlay-selected.svg"/>

  </transition>
</template>

<script>
export default {
  data() {
    return {
      img: '#'
    }
  },

  props: {
    editing: { type: Boolean, default: false }
  },

  computed: {
    empty() {
      return !!!this.editing;
    }
  }
}
</script>

<style scoped>
.player__overlay {
  display: block;
}

</style>