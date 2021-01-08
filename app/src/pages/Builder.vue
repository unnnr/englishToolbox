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
            <div class="builder__areas">
              <button class="builder__group-button builder__group-button--listen"></button>
              <div class="builder__group-placeholder">
                <div class="builder__brick">asdasd</div>
              </div>
              <div class="builder__group-placeholder"></div>
              <div class="builder__group-placeholder"></div>
              <div class="builder__group-placeholder"></div>
              <div class="builder__group-placeholder"></div>
              <div ref="placeholder" class="builder__group-placeholder"></div>
              <button class="builder__group-button builder__group-button--done" disabled></button>
            </div>

            <div class="builder__pool">

              <word 
                :text="'nWord'"
                @drag="drag"/>

            </div>
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
import Dragger from '@services/Dragger'
import Word from '@components/games/builder/Word'

export default {
  components: {
    Word
  },

  data() {
    return {
      dragger: null
    }
  },

  mounted() {
    this.dragger = new Dragger();
    this.dragger.addArea(this.$refs.placeholder)
  },

  methods: {
    drag({target, event}) {
      this.dragger.drag(target, event);
    }
  }
}
</script>