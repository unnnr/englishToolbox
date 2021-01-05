<template>
  <div class="recorder__card recorder__card--disabled">
    <button
      class="recorder__card-button"
      :class="{'recorder__card-button--play': !!!playing,
               'recorder__card-button--pause': playing }"

      :disabled="disabled"
      @click="toggle">
    </button>
    
    <audio-timeline
      :src="src"/>

  </div>
</template>

<script>
import AudioTimeline from '@components/games/recorder/AudioTimeline'

export default {
  components: {
    AudioTimeline,
  },

  props: {
    src: { type: String, default: 'https://cors-anywhere.herokuapp.com/https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' }
  },

  data() {
    return {
      player: null,
      position: 0,

      playing: false
    }
  },

  computed: {
    disabled() {
      return !!!this.src;
    }
  },

  mounted() {
    this.player = new Audio(this.src);

    this.player.addEventListener('canplaythrough', this.load);
    this.player.addEventListener('timeupdate', this.updateTimeline);
  },

  methods: {
    load() {
      console.log('loaded')
    },

    updateTimeline(event) {
      console.log(event);
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