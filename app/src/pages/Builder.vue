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
              @complete="check"
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
import Builder from '@services/Builder'


export default {
  components: {
    Placeholder,
    Pool,
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
      
      this.pool = [ ...this.sample.words];

      this.sentance = [];

      this.seconds = 0;
      this.timer = setInterval(() => this.seconds++, 1000);
    },

    check(sentance) {
      clearInterval(this.timer);

      this.completed = true;
      console.log(this.builder.check(sentance, this.sample.words));
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