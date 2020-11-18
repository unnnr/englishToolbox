<template>
  <div 
    class="player"
    :style="{
      'background-image': imageUrl}">

    <div class="audio-player">
        <div class="audio-player__body">

          <button 
            class="audio-player__button audio-player__button--hide text-fourth">
          </button>
          

          <div class="audio-player__controls audio-player__controls--timeline">
            <button
              class="audio-player__toggler"
              :class="{
                'audio-player__toggler--play': playing,
                'audio-player__toggler--pause': !!!playing,}"
              @click="togglePlauPause">
            </button>
            
            <progress-slider 
              v-model="progress"
              :to="duration"
              :disabled="!!!playable"
              @input="updatePlayer"/>

            <div class="audio-player__timer">
              <span class="audio-player__timer-current text-sixth">{{ formatedCurrent }}</span>
              <span class="audio-player__timer-separator text-sixth">/</span>
              <span class="audio-player__timer-total text-sixth">{{ formatedDuration }}</span>
            </div>
          </div>

          <div class="audio-player__controls audio-player__controls--volume">
            <button 
              class="audio-player__toggler"
              :class="volumeIcon"
              @click="toggleVolume">
            </button>

            <progress-slider
              v-model="volume"
              :disabled="!!!playable"/>
          </div>

        </div>
    </div>

  </div>
</template>

<script>
import ProgressSlider from '@components/ProgressSlider'

export default {
  components: {
    ProgressSlider
  },

  data() {
    return {
      duration: 0,
      progress: 0,

      playing: false,
      playable: false,

      volume: 1,
    
      player: new Audio()
    }
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return {
        image: 'http://etoolbox/storage/avatars/default_1.webp', 
        audio: 'https://www.tutorialrepublic.com/examples/audio/birds.mp3',
      };
      
      return this.$target();
    },

    audio() {
      return this.target ? this.target.audio : '#';
    },

    image() {
      return this.target ? this.target.image : '#';
    },

    volumeIcon: {
      get() {
        if (this.volume >= 0.7)
          return 'audio-player__toggler--volume-up';

        if (this.volume >= 0.3)
          return 'audio-player__toggler--volume-down'

        if (this.volume > 0)
          return 'audio-player__toggler--volume-mute'

        return 'audio-player__toggler--volume-off'; 
      },

      cache: false
    },
    
    formatedDuration() {
      return this.formatTime(this.duration);
    },

    formatedCurrent() {
      return this.formatTime(this.progress);
    },

    imageUrl() {
      return 'url(' + this.image + ')';
    }
  },

  mounted() {
    this.load();
  },

  watch: {
    volume(value) {
      return this.player.volume = value;
    }
  },

  methods: {
    formatTime(seconds) {
      let parsedSeconds = Math.floor(seconds);
      let parsedMinutes = Math.floor(parsedSeconds / 60);
      
      parsedSeconds = parsedSeconds - parsedMinutes * 60;

      if (parsedMinutes > 59) {
        parsedMinutes = 59;
        parsedSeconds = 59;
      }

      return parsedMinutes + ':' + parsedSeconds.toString().padStart(2, '0') ;
    },

    updatePlayer(value) {
      this.player.currentTime = value;
    },

    updateSlider() {
      this.progress = this.player.currentTime;
    },

    play() {
      if (this.playable)
        this.player.play();
    },

    pause() {
      if (this.playable)
        this.player.pause();
    },

    toggleVolume() {
      if (this.volume === 0) {
        // Resuming volume
        if (typeof this.$options.beforeMute === 'number')
          this.volume = this.$options.beforeMute;
        else  
          this.volume = 1; 

        this.$options.beforeMute = null;
      }
      else {
        // Muting
        this.$options.beforeMute = this.volume;
        this.volume = 0;
      }
    },

    togglePlauPause() {
      if (this.playing)
        this.pause();
      else 
        this.play();

      this.playing = !!!this.playing;
    },

    load() {
      function init() {
        this.playable = true;

        this.duration = this.player.duration;
      }

      this.player.src = this.audio;
      this.player.volume = this.volume;

      // Attaching events
      this.player.addEventListener('canplaythrough', 
        init.bind(this), { once: true });

      this.player.addEventListener('timeupdate', 
        event => this.updateSlider());

      this.player.addEventListener('ended', 
        event => this.playing = false);
    },
  },
}
</script>
