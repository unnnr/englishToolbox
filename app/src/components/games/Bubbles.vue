<template>
  <div class="bubbles game">
    <controls
      :time="time"
      @done="check"/>

    <builder
      :text="'I\'m the stoopid -  game -'"
      ref="builder"/>

    <!-- input grabber -->
  </div>
</template>

<script>
import Controls from '@components/games/bubbles/Controls'
import Builder from '@components/games/bubbles/Builder'

export default {
  components: {
    Controls,
    Builder
  },

  data() {
    return {
      time: 0,
      timer: null,
    }
  },

  mounted() {
    this.startGame();
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
      let game = this.$refs.builder;
      game.compare();
    }
  }
};
</script>
