<template>
  <div class="games__selected">
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

  data() {
    return {

    }
  }
}
</script>