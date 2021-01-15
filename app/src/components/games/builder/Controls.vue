<template>
  <div class="game__controls" ref="controlls">
    <div class="game__elements">
      <button 
        v-if="mobile"
        class="game__element game__element--exit"
        @click="close">
      </button>      

      <div class="game__element game__element--timer">{{ seconds }}</div>
      <div class="game__element game__element--counter">{{ streak }}</div>

      <button 
        class="game__element game__element--listen" 
        @click="listen">
      </button>
    </div>

    <button class="game__element game__element--done" @click="done">
      done
    </button>
  </div>
</template>

<script>
export default {
  props: {
    time: { type: Number, default: 0 },

    streak: { type: Number, default: 0 },
  },

  inject: ['$mobile'], 

  computed: {
    seconds() {
      return this.time + 's'
    },
      
    mobile() {
      return this.$mobile();
    }
  },

  methods: {
    done() {
      this.$emit('done');
    },

    listen() {
      this.$emit('listen');
    },

    close() {
      document.exitFullscreen();
    }
  }
}
</script>