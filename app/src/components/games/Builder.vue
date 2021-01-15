<template>
  <div class="game builder">
    <transition name="fade" mode="out-in">
      <prescreen 
        v-if="!!!started"
        @start="start"/>

      <div v-else class="builder__body">
        <controls
          :streak="streak"
          :time="seconds"
          @done="done"
          @listen="listen"/>

        <transition 
          name="slide-right"
          mode="out-in">

          <div 
            class="builder__group"
            :key="counter">

            <placeholder 
              ref="placeholder"
              :disabled="completed"
              :audio="sample.audio"
              :words="sentance"
              :length="length"
              @resolve="remove"/>

            <pool 
              :words="pool"
              :disabled="completed"
              @resolve="append"/>

          </div>
        </transition>

        <result-screen 
          v-if="completed"
          :sample="sample.words"
          :correct="correct"
          :time="seconds"
          @next="reset"/>
      </div>
    </transition>
  </div>
</template>

<script>
import ResultScreen from '@components/games/builder/ResultScreen'
import Placeholder from '@components/games/builder/Placeholder'
import Prescreen from '@components/games/builder/Prescreen'
import Controls from '@components/games/builder/Controls'
import Pool from '@components/games/builder/Pool'
import Builder from '@services/Builder'


export default {
  components: {
    ResultScreen,
    Placeholder,
    Prescreen,
    Controls,
    Pool
  },

  data() {
    return {
      builder: new Builder,
      sample: null,
      player: null,

      seconds: 0,
      streak: 0,
      timer: null,
      
      sentance: [],
      pool: [],

      completed: false,
      correct: false,
      started: false,

      counter: 0,
    }
  },

  computed: {
    length() {
      return this.sample.words.length;
    }
  },

  beforeMount() {
    this.reset();
  },

  mounted() {
    let player = new Audio(this.sample.audio);

    player.addEventListener('canplaythrough', 
      () => this.player = player);
  },


  beforeDestroy() {
    if (this.timer !== null)
      clearInterval(this.timer);

    if (this.player)
      this.player.pause();
  },

  methods: {
    reset() {
      this.sample = this.builder.next();
      this.sentance = [];
      this.pool = [ ...this.sample.words].sort(() => .5 - Math.random());

      this.completed = false;
      this.seconds = 0;
      this.counter++;

      this.timer = setInterval(() => this.seconds++, 1000);
    },

    done() {
      clearInterval(this.timer);

      let sentance = this.$refs.placeholder.words;
      this.correct = this.builder.check(sentance, this.sample.words);

      if (this.correct)
        this.streak++;
      else
        this.streak = 0;

      this.completed = true;
    },
    
    append(word) {
      this.sentance.push(word);
    },

    remove(word) {
      this.pool.push(word);
    },

    listen() {
      if (!!!this.player)
        return;

      this.player.currentTime = 0;
      this.player.play();
    },

    start() {
      this.started = true;
    }
  }
}
</script>

<style lang="sass" scoped>

.builder__group-placeholder
  width: 'auto'
  min-width: 80px
  padding: 0 10px

</style>