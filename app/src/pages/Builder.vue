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
              :length="length"/>

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
import Dragger from '@services/Dragger'

export default {
  components: {
    Placeholder,
    Pool,
  },

  provide() {
    const _this = this;

    return {
      $dragger: () => _this.dragger,
    }
  },

  data() {
    return {
      dragger: null,
      words: ['a', 's', 'word', 'b'],
      pool: []
    }
  },

  computed: {
    length() {
      return this.words.length;
    }
  },

  beforeMount() {
    this.pool = [...this.words];
    this.dragger = new Dragger();
  }
}
</script>