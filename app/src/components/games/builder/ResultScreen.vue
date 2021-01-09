<template>
  <transition 
    name="result"
    appear>

    <div 
      class="builder__alert"
      :class="{
        'builder__alert--success': correct,
        'builder__alert--error': !!!correct}">

      <div class="builder__alert-group">
        <div class="builder__alert-text">
          <h6 class="builder__alert-error-title">Сorrect answer:</h6>
          <h5 class="builder__alert-title">{{ sentance }}</h5>
        </div>
      </div>

      <button
        class="builder__alert-button"
        @click="next">
        
        next
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    
    time: { type: Number, default: 0 },

    sample: { type: Array, default: () => [] },

    correct: { type: Boolean, default: false },
  },

  computed: {
    sentance() {
      let sentance = '';
      for (let word of this.sample)
        sentance += ' ' + word.text;

      return sentance;
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

.builder__alert
  opacity: 1
  height: 100px

.result-enter,
.result-leave-active
  height: 0 !important
  opacity: 0 !important

</style>