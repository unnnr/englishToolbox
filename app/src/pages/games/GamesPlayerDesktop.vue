<template>
  <div 
    class="games__selected">


    <transition
      name="fade"
      mode="out-in">

      <img 
        v-if="none" 
        class="game__overlay"
        src="img/svg/overlay-games.svg" alt="">

      <component :is="game"/>

    </transition>
  </div>
</template>

<script>
export default {
  props: {
    game: { default: null }
  },

  computed: {
    none() {
      return !!!this.game;
    }
  }
}
</script>