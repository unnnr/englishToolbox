<template>
   <div 
    class="game__elements"
    ref="controlls">

      <button 
        v-if="mobile"
        class="game__element game__element--exit"
        @click="close">
      </button>

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


  inject: ['$mobile'], 

  computed: {
    seconds() {
      return this.time + 's';
    },

    mobile() {
      return this.$mobile();
    }
  },

  methods: {
    toMenu() {
      this.$emit('show-menu'); 
    },

    close() {
      document.exitFullscreen();
    }
  }
}
</script>