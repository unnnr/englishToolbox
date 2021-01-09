<template>
  <div 
    class="recorder__card-status-bar">
    <!-- <p class="recorder__card-status-bar-hint text-second">record your reading the text above</p> -->
    <div
      v-for="(height, index) of ticks"
      :key="index"

      class="recorder__card-status-bar-element"
      :class="{
        'recorder__card-status-bar-element--active': tickSelected(index),
        'recorder__card-status-bar-element--recording': recording}"

      :style="{
        'height': height + '%',
        'animation-delay': index * 20 + 'ms'}"

      @click="moveto(index)">
    </div>
  </div>
</template>

<script>
import Resolution from '@services/Resolution'

export default {
  props: {
    src: { type: String, default: ''},

    value: { type: Number, default: 0 },

    duration: { type: Number, default: 0 },

    recording: { type: Boolean, default: false }
  },

  data() {
    return {
      ticksCount: 0,
      ticks: [],

      tickWidth: 8,
      gap: 8
    }
  },

  computed: {
    disabled() {
      return !!!this.src;
    }
  },

  watch: {
    src(value) {
      if (value)
        this.computeShape(this.ticksCount);
      else 
        this.fillDummy(this.ticksCount);
    },
    
    ticksCount(count) {
      if (this.disabled)
        this.fillDummy(count)
      else
        this.computeShape(count);
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
    moveto(position) {
      if (this.disabled)
        return;

      let timestamp = 
        this.duration * (position + 1) / this.ticksCount;

      this.$emit('input', timestamp);
    },

    tickSelected(index) {
      if (this.disabled || this.recording || !!!this.value)
        return false;
        
      let position = 0;
      if (this.value)
        position = this.ticksCount * this.value / this.duration;

      return index <= position;
    },

    computeLength() {
      this.ticksCount = 
        Math.floor(this.$el.offsetWidth / (this.tickWidth + this.gap)) 
    },

    computeShape(count) {
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
      let multiplier = Math.pow(Math.max(...audioBuffer), -1);
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
        list.push(0);

      this.ticks = list;
    }
  }
}
</script>

<style lang="sass">

.recorder__card-status-bar-element
  min-height: 20%

.recorder__card-status-bar
  height: 50px

.recorder__card-status-bar-element--recording
  animation: shrink 1s infinite

@keyframes shrink 
  0%
    height: 100%
  50%
    height: 30%
  100%
    height: 100%
  
</style>