<template>
  <video-processor 
    :request="submit"
    editing/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'

export default {
  components: {
    VideoProcessor
  },

  methods: {
    submit() {
      console.log('Editing');
    }
  }
}
</script>