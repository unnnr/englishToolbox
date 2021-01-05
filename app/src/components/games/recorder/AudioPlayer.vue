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
      :src="src"
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
      duration: 0
    }
  },

  computed: {
    disabled() {
      return !!!this.src || !!!this.duration;
    }
  },

  mounted() {
    this.player = new Audio(this.src);

    this.player.addEventListener('canplaythrough', this.load);
    this.player.addEventListener('timeupdate', this.updateTimeline);
    this.player.addEventListener('ended', this.end);
  },

  methods: {
    load() {
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