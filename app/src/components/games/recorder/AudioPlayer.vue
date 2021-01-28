<template>
  <div class="recorder__card">
    <button
      class="recorder__card-button"
      :class="{'recorder__card-button--play': !!!playing,
               'recorder__card-button--pause': playing }"

      :disabled="disabled"
      @click="toggle">
    </button>
    
    <audio-timeline
      :duration="duration"
      :value="position"
      :src="blob"
      @input="moveto"/>
  </div>
</template>

<script>
import AudioTimeline from '@components/games/recorder/AudioTimeline'

export default {
  components: {
    AudioTimeline,
  },

  props: {
    src: { type: String, default: null }
  },

  data() {
    return {
      player: null,
      position: 0,

      playing: false,
      duration: 0,

      blob: null
    }
  },

  computed: {
    disabled() {
      return !!!this.src || !!!this.duration || this.duration === Infinity;
    }
  },

  mounted() {
    fetch(this.src)
      .then(response => response.blob())
      .then(blob => this.blob = URL.createObjectURL(blob))
      .then(this.load)
  },

  beforeDestroy() {
    if (this.blob)
      URL.revokeObjectURL(this.blob);

    if (this.player)
      this.player.pause();
  },

  methods: {
    load() {
      this.player = new Audio(this.src);

      this.player.addEventListener('durationchange', this.loaded);
      this.player.addEventListener('timeupdate', this.updateTimeline);
      this.player.addEventListener('ended', this.end);
    },

    async loaded() {
      while (this.player.duration === Infinity) {
        await new Promise(r => setTimeout(r, 1000));
        this.player.currentTime = 10000000 * Math.random();
      }

      this.player.currentTime = 0;
      this.duration = this.player.duration;
    },


    end() {
      this.playing = false
    },

    updateTimeline() {
      this.position = this.player.currentTime;
    },

    moveto(timestamp) {
      this.player.currentTime = timestamp;
    },

    play() {
      this.player.play();
      this.playing = true;
    },

    pause() {
      this.player.pause();
      this.playing = false;
    },

    toggle() {
      if (!!!this.playing)
        this.play();
      else
        this.pause();
    }
  }
}
</script>