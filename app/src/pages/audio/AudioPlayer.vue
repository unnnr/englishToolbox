<template>
  <div class="player">

    <div class="audio-player">
        <div class="audio-player__body">

          <button 
            class="audio-player__button audio-player__button--hide text-fourth">
          </button>
          

          <div class="audio-player__controls audio-player__controls--timeline">
            
            <transition name="fade">
              <button v-if="audio.playing"
               class="audio-player__toggler audio-player__toggler--pause"
               @click="pause">
             </button>
              <button v-else
                class="audio-player__toggler audio-player__toggler--play"
                @click="play">
              </button>
            </transition>
            
            <progress-slider 
              :value="audio.progress"
              :to="audio.duration"
              :disabled="!!!audio.playable"
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
              v-model="audio.volume"
              :disabled="!!!audio.playable"/>
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
      audio: {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',

        duration: 0,
        progress: 0,
        volume: 1,

        playing: false,
        playable: false,
      },
      
    
      player: new Audio()
    }
  },

  computed: {
    formatedDuration() {
      return this.formatTime(this.audio.duration);
    },

    formatedCurrent() {
      return this.formatTime(this.audio.progress);
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    formatTime(seconds) {
      let parsedSeconds = Math.floor(seconds);
      let parsedMinutes = Math.floor(parsedSeconds / 60);
      
      parsedSeconds = parsedSeconds - parsedMinutes * 60;

      if (parsedMinutes >  59) {
        parsedMinutes = 59;
        parsedSeconds = 59;
      }

      return parsedMinutes + ':' + parsedSeconds.toString().padStart(2, '0') ;
    },

    updatePlayer(value) {
      this.audio.progress = value;
      this.player.currentTime  =  value;
    },

    updateSlider() {
      this.audio.progress = this.player.currentTime;
    },

    load() {
      function init() {
        this.audio.playable = true;

        this.audio.duration = this.player.duration;
      }

      this.player.src = this.audio.src;
      this.player.volume = 1;

      this.player.addEventListener('canplaythrough', 
        init.bind(this), { once: true });

      this.player.addEventListener('timeupdate', 
        event => this.updateSlider());

      this.player.addEventListener('ended', 
        event => this.audio.playing = false);
    },

    play() {
      if (!!!this.audio.playable)
        return;

      this.audio.playing = true;
      this.player.play();
    },

    pause() {
      if (!!!this.audio.playable)
        return;

      this.audio.playing = false;
      this.player.pause();
    }
  }
}
</script>
