<template>
  <div class="game matcher" ref="canvas">

    <menu
      v-if="false"
      @start="start"/>

    <progress-bar
      ref="progress"
      :progress="progress"/>

    <controls
      ref="controls"
      :time="time"
      :counter="counter"
      @menu-shown="stop"/>

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
import Menu from '@components/games/matcher/Menu'
import IrregularVerbs from '@services/matcher/IrregularVerbs'
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
      game: null,
      started: false
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


  beforeDestroy() {
    Resolution.detach(this.resize);
    this.clear();
  },

  mounted() {
    this.start();
  },

  methods: {
    stop() {
      this.clear();
      this.started = false;
    },

    start() {
      this.worldHeight = Config.world.height;
      this.worldWidth = Config.world.width; 

      this.startGame();
      this.startTimer();

      Resolution.listen(this.resize, true);
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

    startGame() {
      this.initCutout();
      
      let words = IrregularVerbs.slice(Config.deckLength);
      let canvas = this.$refs.canvas;

      this.game = new Matcher(canvas);
      this.game.start(words);
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
