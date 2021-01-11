<template>
  <div class="game builder">

    <div class="game__controls" ref="controlls">
      <div class="game__elements">
        <button class="game__element game__element--exit"></button>
        <div class="game__element game__element--timer">{{ seconds }}</div>
        <div class="game__element game__element--counter">{{ streak }}</div>
      </div>
    </div>

    <transition 
      name="slide-right"
      mode="out-in">

        <div 
          class="builder__group"
          :key="counter">

          <placeholder 
            :disabled="completed"
            :audio="sample.audio"
            :words="sentance"
            :length="length"
            @complete="check"
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
</template>

<script>
import ResultScreen from '@components/games/builder/ResultScreen'
import Placeholder from '@components/games/builder/Placeholder'
import Pool from '@components/games/builder/Pool'
import Builder from '@services/Builder'


export default {
  components: {
    ResultScreen,
    Placeholder,
    Pool
  },

  data() {
    return {
      builder: new Builder,
      sample: null,

      seconds: 0,
      streak: 0,
      timer: null,
      
      sentance: [],
      pool: [],

      completed: false,
      correct: false,

      counter: 0
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

  beforeDestroy() {
    if (this.timer !== null)
      clearInterval(this.timer);
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

    check(sentance) {
      clearInterval(this.timer);

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