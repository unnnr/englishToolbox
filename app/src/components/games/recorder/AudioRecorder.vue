<template>
  <div class="recorder__card recorder__card--record">
    <button class="recorder__card-button recorder__card-button--record"></button>
      <!-- record your reading the text above -->
    <audio-timeline
      :recording="recording"
      :duration="duration"
      :value="position"
      :src="blob"
      @input="moveto"/>


    <button class="recorder__card-button recorder__card-button--rerecord" disabled></button>
  </div>
</template>


<script>
import AudioTimeline from '@components/games/recorder/AudioTimeline'

export default {
  components: {
    AudioTimeline,
  },

  data() {
    return {
      recording: true,

      player: null,
      position: 0,

      playing: false,
      duration: 0,

      blob: null
    }
  },

  mounted() {
    return;
    fetch(this.src)
      .then(response => response.blob())
      .then(blob => this.blob = URL.createObjectURL(blob))
      .then(this.load)
  },

  beforeDestroy() {
    if (this.blob)
      URL.revokeObjectURL(this.blob);
  },

  methods: {
    load() {
      this.player = new Audio(this.src);

      this.player.addEventListener('canplaythrough', this.loaded);
      this.player.addEventListener('timeupdate', this.updateTimeline);
      this.player.addEventListener('ended', this.end);
    },

    loaded() {
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

      if (!!!this.playing)
        this.player.play();
    },

    toggle() {
      this.playing = !!!this.playing;

      if (this.playing)
        this.player.play();
      else
        this.player.pause();
    }
  }
}
</script>