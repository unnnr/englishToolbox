<template>
   <div 
    class="game__elements"
    ref="controlls">

      <button class="game__element game__element--exit"></button>
      <button class="game__element game__element--menu" @click="toMenu">
        menu
      </button>

      <div class="game__element game__element--timer">{{ seconds }}</div>
      <div class="game__element game__element--matches">{{ counter }}</div>
  </div>
</template>

<script>
export default {
  props: {
    time: { type: Number, default: 0 },
    
    counter: { type: String, default: '' },
  },

  computed: {
    seconds() {
      return this.time + 's';
    }
  },

  methods: {
    toMenu() {
      this.$emit('showMenu'); 
    }
  }
}
</script>