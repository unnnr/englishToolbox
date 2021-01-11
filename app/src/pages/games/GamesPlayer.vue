<template>
  <div class="games__selected">
    <component :is="game"/>
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