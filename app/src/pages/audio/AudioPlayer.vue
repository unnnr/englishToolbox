<template>
  <div class="player">

    <div class="audio-player">
        <div class="audio-player__body">

          <button class="audio-player__button audio-player__button--hide text-fourth"></button>

          <div class="audio-player__controls audio-player__controls--timeline">
            <button class="audio-player__toggler audio-player__toggler--play"></button>
            <progress-slider/>

            <div class="audio-player__timer">
              <span class="audio-player__timer-current text-sixth">0:00</span>
              <span class="audio-player__timer-separator text-sixth">/</span>
              <span class="audio-player__timer-total text-sixth">9:99</span>
            </div>
          </div>

          <div class="audio-player__controls audio-player__controls--volume">
            <button class="audio-player__toggler audio-player__toggler--volume-up"></button>
            <progress-slider/>
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

    }
  },

  methods: {
    
  }
}
</script>
