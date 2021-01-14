<template>
  <div class="games__overlay">
    <h2 class="games__overlay-title heading-second">Whiteboard</h2>
    <p class="games__overlay-description text-second">description description</p>
    
    <button class="games__overlay-button" @click="start">
      start
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.$emit('start');
    }
  }
}
</script>