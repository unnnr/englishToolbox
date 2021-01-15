<template>
  <div class="game__controls">
    <div class="game__elements">
      <button 
        v-if="mobile"
        class="game__element game__element--exit"
        @click="close">
      </button>

      <button class="game__element game__element--timer">
        {{ seconds }}
      </button>
    </div>
    <button 
      class="game__element game__element--done"
      @click="done">
      
      done
    </button>
  </div>
</template>

<script>
export default {
  props: {
    time: { type: Number, default: 0 }
  },

   inject: ['$mobile'], 

  computed: {
    mobile() {
      return this.$mobile();
    },

    seconds() {
      return this.time + 's'
    }
  },

  methods: {
    done() {
      this.$emit('done');
    },

    close() {
      document.exitFullscreen();
    }
  }
}
</script>