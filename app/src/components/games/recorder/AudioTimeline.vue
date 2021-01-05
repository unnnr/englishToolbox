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
  data() {
    return {
      ticksCount: 0,
      ticks: [],

      tickWidth: 10,
      gap: 10,

      src: 'https://cors-anywhere.herokuapp.com/https://www.w3schools.com/tags/horse.mp3',
      player: new Audio()
    }
  },

  watch: {
    ticksCount(count) {
      this.comuteShape(count);
    }
  },

  mounted() {
    window.AudioContext = 
      window.AudioContext || window.webkitAudioContext;
        

    this.player.source = this.src;

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
    
    comuteShape(count) {
      let audioContext = new AudioContext();

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