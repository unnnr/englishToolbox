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

      <!--   <div class="matcher__results">
          <div class="matcher__results-body">
            <div class="matcher__results-scrollable">
              <h4 class="matcher__results-heading heading-fourth">
                well done!
              </h4>
              <p class="matcher__results-time text-fourth">
                Your time: <span>15:69</span>
              </p>
              <table class="matcher__results-table">
                <tr>
                  <th>№</th>
                  <th>infinitive</th>
                  <th>past simple</th>
                  <th>past participle</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>arise</td>
                  <td>arose</td>
                  <td>arisen</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>awake</td>
                  <td>awoke</td>
                  <td>awoken</td>
                </tr>
              </table>
              <button class="matcher__results-restart-button button-secondary">again</button>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import Matcher from "@services/matcher/Matcher";
import Config from "@services/matcher/Config";
import SlideTransitonVue from '../components/transitions/SlideTransiton.vue';

export default {
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
    }
  },

  mounted() {
    this.start();
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => this.time++, 1000);
    },
    
    stopTimer() {
      if (this.timer !== null)
        this.timer = setInterval(() => this.time++, 1000);
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

      let k = Config.world.width / (this.$el.offsetWidth);

      console.log(k);

      Config.world.uiCutout = {
        x: 0, y: 0,

        height: (controlls.offsetHeight + 20) * k,
        width: (controlls.offsetWidth + 40) * k,
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
  height: 100%

.matcher__progress-bar-current
  transition: width .3s

</style>
