<template>
  <div class="recorder__card-status-bar">
    <!-- <p class="recorder__card-status-bar-hint text-second">record your reading the text above</p> -->
    <div
      class="recorder__card-status-bar-element"
      v-for="(height, index) of ticks"
      :key="index"
      :style="{'height': height + '%'}">
    </div>
  </div>
</template>

<script>
import Resolution from '@services/Resolution'

export default {
  props: {
    src: { type: String, default: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'},

    value: { type: Number, default: 0 }
  },

  data() {
    return {
      ticksCount: 0,
      ticks: [],

      tickWidth: 8,
      gap: 8,
    }
  },

  computed: {
    disabled() {
      return !!!this.src;
    }
  },

  watch: {
    ticksCount(count) {
      if (this.disabled)
        this.fillDummy(count)
      else
        this.comuteShape(count);
    }
  },

  mounted() {
    window.AudioContext = 
      window.AudioContext || window.webkitAudioContext;

    Resolution.bind(this.computeLength, true);
  },

  beforeDestroy() {
    Resolution.detach(this.computeLength);
  },
  
  methods: {
    computeLength() {
      this.ticksCount = 
        Math.floor(this.$el.offsetWidth / (this.tickWidth + this.gap)) 
    },

    async comuteShape(count) {
      let audioContext = new AudioContext();

      await new Promise(resolve => setTimeout(resolve, 2000))

      fetch(this.src)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => this.proceed(audioBuffer, count));
    },

    chunk(audioBuffer, blocksCount) {
      let rawBuffer = audioBuffer.getChannelData(0);
      let chunkSize = Math.floor(rawBuffer.length / blocksCount);
      let chunked = [];

      for (let i = 0; i < blocksCount; i++) {
        let offset = i * blocksCount;

        let sum = 0;
        for (let j = 0; j < blocksCount; j++)
          sum += Math.abs(rawBuffer[offset + j]);

        let average = sum / blocksCount;
        chunked.push(average);
      }

      return chunked;
    },

    normalize(audioBuffer) {
      const multiplier = Math.pow(Math.max(...audioBuffer), -1);
      return audioBuffer.map(n => n * multiplier);
    },

    visualize(frequencies) {
      let ticks = [];
      for (let frequency of frequencies) 
        ticks.push(frequency * 100);

      this.ticks = ticks;
    },

    proceed(audioBuffer, ticksCount) {
      let chuncked = 
        this.chunk(audioBuffer, ticksCount);
      
      let normalised = 
        this.normalize(chuncked);

      this.visualize(normalised, ticksCount);
    },

    fillDummy(count) {
      let list = [];
      for (let i = 0 ; i < count; i++)
        list.push(100);

      this.ticks = list;
    }
  }
}
</script>

<style lang="sass">

.recorder__card-status-bar-element
  min-height: 20%
  transition: height .3s

.recorder__card-status-bar
  height: 50px

</style>