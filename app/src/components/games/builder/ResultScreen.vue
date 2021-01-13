<template>
  <transition 
    name="result"
    appear>
      
    <div 
      class="game__alert"
      :class="{
        'game__alert--success': correct,
        'game__alert--error': !!!correct}">

      <div class="game__alert-group">
        <div class="game__alert-text">
          <h6 class="game__alert-error">Сorrect answer:</h6>
          <h5 class="game__alert-title">
            {{ message }}
          </h5>
        </div>
      </div>

      <button
        class="game__alert-button"
        @click="next">
        
        next
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    sample: { type: Array, default: () => [] },

    correct: { type: Boolean, default: false },
  },

  computed: {
    sentence() {
      let sentence = '';
      for (let word of this.sample)
        sentence += ' ' + word.text;

      return sentence;
    },

    message() {
      return !!!this.correct ? 
        this.sentence : 'Great job, keep it up!'
    }
  },

  methods: {
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