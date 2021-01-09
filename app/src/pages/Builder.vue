<template>
   <section class="games container">
    <div class="games__selected">

      <transition 
        name="slide-right"
        mode="out-in">

        <div class="builder">

          <div class="builder__controls" ref="controlls">
            <button class="builder__element builder__exit-button"></button>
            <div class="builder__element builder__timer">{{ seconds }}</div>
            <div class="builder__element builder__counter">{{ streak }}</div>
          </div>

          <div class="builder__group">

            <placeholder 
              :words="sentance"
              :length="length"
              @resolve="remove"/>

            <pool 
              :words="pool"
              @resolve="append"/>

          </div>

          <div class="builder__alert builder__alert--active builder__alert--success">
            <div class="builder__alert-group">
              <div class="builder__alert-text">
                <h6 class="builder__alert-error-title">Сorrect answer:</h6>
                <h5 class="builder__alert-title">Arcu nibh volutpat imperdiet nulla nibh</h5>
              </div>
            </div>
            <button class="builder__alert-button">next</button>
          </div>

        </div>
      </transition>

    </div>
  </section>
</template>

<script>
import Placeholder from '@components/games/builder/Placeholder'
import Pool from '@components/games/builder/Pool'

export default {
  components: {
    Placeholder,
    Pool,
  },

  data() {
    return {
      words: [ 
        {text: 'a', key: 1},
        {text: 'asdasdasdasdasdsa', key: 2},
        {text: 'some', key: 3},
        {text: 'to', key: 4},
      ],

      sample: null,

      seconds: 0,
      streak: 0,
      timer: null,
      
      sentance: [],
      pool: [],
    }
  },

  computed: {
    length() {
      return this.words.length;
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
      this.pool = [ ...this.words];

      this.sentance = [];

      this.seconds = 0;
      this.timer = setInterval(() => this.seconds++, 1000);
    },

    check(word) {
      clearInterval(this.timer);

      this.compleuted = true;
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