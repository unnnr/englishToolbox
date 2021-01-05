<template>
  <div class="recorder__card-status-bar">
    <!-- <p class="recorder__card-status-bar-hint text-second">record your reading the text above</p> -->
    <div
      class="recorder__card-status-bar-element"
      v-for="index in ticksCount"
      :key="index">
    </div>
  </div>
</template>

<script>
import Resolution from '@services/Resolution'

export default {
  data() {
    return {
      ticksCount: 0,
      tickWidth: 10,
      gap: 10
    }
  },

  mounted() {
    Resolution.listen(this.computeLength, true);
  },

  beforeDestroy() {
    Resolution.detach(this.computeLength);
  },
  
  methods: {
    temp() {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = audioCtx.createAnalyser();
    },

    computeLength() {
      this.ticksCount = 
        Math.floor(this.$el.offsetWidth / (this.tickWidth + this.gap)) 
    }
  }
}
</script>

<style lang="sass">

.recorder__card-status-bar-element
  transition: height .3s

</style>