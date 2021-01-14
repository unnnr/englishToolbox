<template>
  <div 
    v-if="!!!started" 
    class="game matcher">
    
    <verbs-list
      @start="start"/>
  </div>

  <div v-else class="game matcher" ref="canvas">

    <progress-bar
      ref="progress"
      :progress="progress"/>

    <controls
      ref="controls"
      :time="time"
      :counter="counter"
      @show-menu="stop"/>

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
import VerbsList from '@components/games/matcher/Menu'
import Resolution from '@services/Resolution'
import Matcher from '@services/matcher/Matcher'
import Config from '@services/matcher/Config'

export default {
  components: {
    ResultScreen,
    ProgressBar,
    VerbsList,
    Controls,
  },

  data() {
    return {
      time: 0,
      deckLength: 0,

      timer: null,
      game: null,

      started: false,
      words: []
    }
  },

  computed: {
    matched() {
      if (!!!this.game || !!!this.game.world)
        return 0;

      return this.game.world.matches;
    },

    progress() {
      return this.matched * 100 / this.deckLength; 
    },

    counter() {
      return this.matched + '/' + this.deckLength;
    },

    ended() {
      return this.started && this.matched === this.deckLength;
    }
  },

  watch: {
    ended(value) {
      if (value)
        this.stopTimer();
    }
  },

  beforeDestroy() {
    this.clear();
  },

  methods: {
    stop() {
      this.clear();
      this.started = false;
    },

    async start(words) {
      this.deckLength = Config.deckLength = words.length / 3;
      this.words = words;
      this.started = true;

      await this.$nextTick();

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

      let canvas = this.$refs.canvas;
      this.game = new Matcher(canvas);
      this.game.start(this.words);
    },

    restart() {
      this.initCutout();
      this.game.start(this.words);

      this.stopTimer();
      this.startTimer();
      this.time = 0;
    },

    clear() {
      this.stopTimer();
      clearInterval(this.timer)

      Resolution.detach(this.resize);
      
      if (!!!this.game)
        return;

      this.game.clear();
      
      let canvas = this.$el.querySelector('canvas');
      if (canvas)
        canvas.remove();
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
