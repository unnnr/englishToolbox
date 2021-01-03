<template>
  <section class="games container">
    <div class="games__selected">
      <div class="matcher" ref="canvas">
        <div class="matcher__progress-bar">
          <div 
            class="matcher__progress-bar-current"
            :style="{'width': progressWidth}">
          </div>
        </div>

        <div 
          class="matcher__controls"
          ref="controlls">

          <button class="matcher__element matcher__exit-button"></button>
          <div class="matcher__element matcher__timer">{{ seconds }}</div>
          <div class="matcher__element matcher__counter">{{ counter }}</div>
        </div>
      </div>

      <transition name="fade">
        <result-screen
          v-if="ended"
          :seconds="time"
          :words="words"
          @restart="restart"/>
      </transition>
    </div>
  </section>
</template>

<script>
import ResultScreen from '@components/games/matcher/ResultScreen'
import Resolution from '@services/Resolution'
import Matcher from '@services/matcher/Matcher'
import Config from '@services/matcher/Config'

export default {
  components: {
    ResultScreen
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

    progressWidth() {
      return this.progress + '%';
    },

    counter() {
      return this.matched + '/' + this.deckLength;
    },

    seconds() {
      return this.time + 'sec';
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
    this.start();

    Resolution.listen(() => {
      this.initCutout()
      this.game && this.game.resize()
    }, true);
  },

  methods: {
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

    initCutout() {
      let controlls = this.$refs.controlls;
      let canvas = this.$refs.canvas;

      Config.world.uiCutout = {
        x: 0, y: 0,

        height: (controlls.offsetHeight + 5) 
          * (Config.world.height / canvas.offsetHeight),

        width: (controlls.offsetWidth + 20) 
          * (Config.world.width / canvas.offsetWidth),
      }
    }
  }
};
</script>

<style lang="sass">
.matcher
  position: absolute
  width: 100%
  height: 100%

.matcher canvas
  width: 100%

.matcher__progress-bar-current
  transition: width .3s

.matcher__progress-bar
  position: relative
  
</style>
