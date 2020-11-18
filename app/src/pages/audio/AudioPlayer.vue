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
            <button v-if="playing"
              class="audio-player__toggler audio-player__toggler--pause"
              @click="pause">
            </button>
            
            <button v-else
              class="audio-player__toggler audio-player__toggler--play"
              @click="play">
            </button>
            
            <progress-slider 
              :value="progress"
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
            <button class="audio-player__toggler audio-player__toggler--volume-up"></button>
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
    
      player: new Audio()
    }
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    audio() {
      return this.target ? this.target.audio : '#';
    },

    image() {
      return this.target ? this.target.image : '#';
    },
    
    volume: {
      set(value) {
        return this.player.volume = value;
      },

      get() {
        return this.player.volume;
      }
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
    console.log(this)
    this.load();
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
      this.progress = value;
      this.player.currentTime  =  value;
    },

    updateSlider() {
      this.progress = this.player.currentTime;
    },

    play() {
      if (!!!this.playable)
        return;

      this.playing = true;
      this.player.play();
    },

    pause() {
      if (!!!this.playable)
        return;

      this.playing = false;
      this.player.pause();
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
