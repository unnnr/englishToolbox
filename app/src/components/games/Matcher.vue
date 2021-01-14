<template>
  <div class="game matcher" ref="canvas">
    <progress-bar
      ref="progress"
      :progress="progress"/>

    <controls
      ref="controls"
      :time="time"
      :counter="counter"
      @menu-shown="showMenu"/>

    <transition name="fade">
      <result-screen
        v-if="ended"
        :seconds="time"
        :words="words"
        @restart="restart"/>
    </transition>
  </div>
</template>

<script>
import ResultScreen from '@components/games/matcher/ResultScreen'
import ProgressBar from '@components/games/matcher/ProgressBar'
import Controls from '@components/games/matcher/Controls'
import Resolution from '@services/Resolution'
import Matcher from '@services/matcher/Matcher'
import Config from '@services/matcher/Config'

export default {
  components: {
    ResultScreen,
    ProgressBar,
    Controls
  },

  data() {
    return {
      time: 0,
      timer: null,
      game: null
    }
  },

  computed: {
    matched() {
      if (!!!this.game || !!!this.game.world)
        return 0;

      return this.game.world.matches;
    },

    words() {
      if (!!!this.game || !!!this.game.world)
        return [];

      return this.game.world.words;
    },

    deckLength() {
      return Config.deckLength;
    },

    progress() {
      return this.matched * 100 / this.deckLength; 
    },

    counter() {
      return this.matched + '/' + this.deckLength;
    },

    ended() {
      return this.matched === this.deckLength;
    }
  },

  watch: {
    ended(value) {
      if (value)
        this.stopTimer();
    }
  },

  mounted() {
    this.worldHeight = Config.world.height;
    this.worldWidth = Config.world.width; 
    this.start();

    Resolution.listen(this.resize, true);
  },

  beforeDestroy() {
    Resolution.detach(this.resize);
    this.clear();
  },

  methods: {
    showMenu() {

    },

    startTimer() {
      this.timer = setInterval(() => this.time++, 1000);
    },
    
    stopTimer() {
      if (this.timer === null)
        return;
      
      clearInterval(this.timer);
      this.timer = null;
    },

    start() {
      let canvas = this.$refs.canvas;

      this.game = new Matcher(canvas);

      this.initCutout();
      this.game.start();
      this.startTimer();
    },

    restart() {
      this.initCutout();
      this.game.start();

      this.stopTimer();
      this.startTimer();
      this.time = 0;
    },

    clear() {
      this.stopTimer();
      clearInterval(this.timer)        
      this.game.clear();
    },

    resize() {
      this.initCutout()
      this.game && this.game.resize()
    },

    initCutout() {
      let canvas = this.$refs.canvas;

      let controls = this.$refs.controls.$el;
      Config.world.uiCutout = {
        x: 0, y: 0,

        height: (controls.offsetHeight + 5) 
          * (this.worldHeight / canvas.offsetHeight),

        width: (controls.offsetWidth + 5) 
          * (this.worldWidth / canvas.offsetWidth),
      }

      let progress = this.$refs.progress.$el;
      Config.world.height = 
        this.worldHeight - this.worldHeight / (canvas.offsetHeight / progress.offsetHeight)
    }
  }
};
</script>

<style lang="sass">

.matcher canvas
  width: 100%

</style>
