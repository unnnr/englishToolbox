<template>
  <transition 
    name="result"
    appear>

    <div 
      class="bubbles__alert game__alert"
      :class="{
        'game__alert--success': correct,
        'game__alert--error': !!!correct}">

      <div class="game__alert-group">
        <div class="game__alert-text">
          <h6 class="game__alert-error">
            Nice try. You were too close!
          </h6>

          <h5 class="game__alert-title">
            {{ message }}
          </h5>
        </div>
      </div>

      <div class="game__alert-button-group">
        <button
          class="game__alert-button game__alert-button--restart"
          @click="reset">
        </button>

        <button
          class="game__alert-button"
          @click="next">
          
          next
        </button>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  props: {
    correct: { type: Boolean, default: false },
  },

  computed: {
    message() {
      return !!!this.correct ? 
        this.sentance : 'Great job, keep it up!'
    }
  },

  methods: {
    reset() {
      this.$emit('reset');
    },

    next() {
      this.$emit('next');
    }
  }
}
</script>

<style lang="sass">

.game__alert
  opacity: 1
  height: 100px

.result-enter,
.result-leave-active
  height: 0 !important
  opacity: 0 !important

</style>