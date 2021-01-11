<template>
  <div class="bubbles game">
    <controls
      :time="time"/>

    <builder/>

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
    }
  }
};
</script>
