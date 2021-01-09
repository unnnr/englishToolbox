<template>
   <section class="games container">
    <div class="games__selected">

      <transition 
        name="slide-right"
        mode="out-in">

        <div class="builder">

          <div class="builder__controls" ref="controlls">
            <button class="builder__element builder__exit-button"></button>
            <div class="builder__element builder__timer">123</div>
            <div class="builder__element builder__counter">453</div>
          </div>

          <div class="builder__group">

            <placeholder 
              :words="sentance"/>

            <pool 
              :words="pool"/>

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
        {text: 'asdasd', key: 2},
        {text: 'some', key: 3},
        {text: 'to', key: 4},
      ],
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
    this.update();
  },

  methods: {
    update() {
      this.pool = [ ...this.words];

      this.sentance = 
        this.pool.map(() => '');
    }
  }
}
</script>