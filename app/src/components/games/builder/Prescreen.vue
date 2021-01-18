<template>
  <div class="games__overlay">
    <h2 class="games__overlay-title heading-second">Builder Verbs</h2>
    <p class="games__overlay-description text-second">Build a correct sentence from the given words</p>
    
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