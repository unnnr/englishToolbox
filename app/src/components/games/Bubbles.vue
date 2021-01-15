<template>
  <prescreen 
    v-if="!!!started"
    @start="start"/>

  <div v-else class="bubbles game">
    <controls
      :time="time"
      @done="check"/>

    <builder
      :text="text"
      ref="builder"
      @next="reset"/>

  </div>
</template>

<script>
import Prescreen from '@components/games/bubbles/Prescreen'
import Controls from '@components/games/bubbles/Controls'
import Builder from '@components/games/bubbles/Builder'


export default {
  components: {
    Prescreen,
    Controls,
    Builder
  },

  data() {
    return {
      time: 0,
      timer: null,

      started: false,
      text: ''
    }
  },

  beforeDestroy() {
    this.clearTimer();
  },  

  methods: {
    clearTimer() {
      if (this.timer !== null)
        clearInterval(this.timer);

      this.time = 0;
    },

    startGame() {
      this.clearTimer();
      this.timer = setInterval(() => this.time++, 1000);
    },

    check() {
      clearInterval(this.timer);
      
      let game = this.$refs.builder;
      game.compare();
    },
    
    reset() {
      this.started = false;
    },

    start(text) {
      this.text = text;
      this.started = true;
      this.startGame();
    }
  }
};
</script>
