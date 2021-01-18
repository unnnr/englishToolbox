<template>
  <div class="player">

    <div 
      class="player__content"
      :class="{'player__content--blurred': blurred}"
      :style="{'background-image': imageUrl}">
    </div>

    <transition name="fade">
      <object  
        v-if="overlayShown"
        class="player__overlay"
        :style="{'background-image': overlayUrl}">
      </object>
      
      <div v-else class="audio-player">
        <div class="audio-player__body">

          <button 
            class="audio-player__button text-fourth"
            :class="{
                'audio-player__button--hide': !!!blurred,
                'audio-player__button--show': blurred}"
            @click="toggleBlur">
          </button>
          
          <div class="audio-player__controls audio-player__controls--timeline">
            <button
              class="audio-player__toggler"
              :class="{
                'audio-player__toggler--play': !!!playing,
                'audio-player__toggler--pause': playing}"
              :disabled="disabled"
              @click="togglePlauPause">
            </button>
            
            <progress-slider 
              v-model="progress"
              :to="duration"
              :disabled="disabled"
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
              :disabled="disabled"/>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import ProgressSlider from '@components/ProgressSlider'
import HandleEvents from '@mixins/HandleEvents'

export default {
  components: {
    ProgressSlider
  },

  mixins: [ HandleEvents ],

  inject: [ '$target' ],

  data() {
    return {
      overlay: 'img/svg/overlay-audios.svg',
      
      duration: 0,
      progress: 0,

      blurred: true,
      playing: false,
      playable: false,

      volume: 1,
    
      player: new Audio(),

      preview: {
        image: null,
        audio: null,
      },
    }
  },


  computed: {
    target() {
      return this.$target();
    },

    overlayShown() {
      return !!!this.audio || !!!this.image;
    },

    overlayUrl() {
      return 'url(' + this.overlay + ')'
    },

    disabled() {
      return !!!this.playable;
    },

    audio() {
       if (this.preview.audio)
        return this.preview.audio;

      if (this.target && this.target.audio)
        return this.target.audio;

      return null;
    },

    image() {
      if (this.preview.image)
        return this.preview.image;

      if (this.target && this.target.image)
        return this.target.image;

      return null;
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

  watch: {
    volume(value) {
      return this.player.volume = value;
    },
    
    audio: {
      handler(value) {
        if (value)
          this.load();
      },

      immediate: true
    }
  },

  mounted() {
    this.listen({'preview-changed':
      preview => Object.assign(this.preview, preview)});
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

    toggleBlur() {
      this.blurred = !!!this.blurred;
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
