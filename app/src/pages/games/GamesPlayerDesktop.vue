<template>
  <div 
    class="games__selected"
    :class="{'games_selected--none': none}">

    <transition
      name="fade"
      mode="out-in">

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