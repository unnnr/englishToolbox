<template>
  <div class="recorder__card recorder__card--disabled">
    <button class="recorder__card-button recorder__card-button--play material-icons"></button>
    
    <audio-timeline/>
  </div>
</template>

<script>
import AudioTimeline from '@components/games/recorder/AudioTimeline'

export default {
  components: {
    AudioTimeline
  }
}
</script>