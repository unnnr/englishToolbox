<template>
  <video-processor 
    :request="submit"/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'

export default {
  components: {
    VideoProcessor
  },

  methods: {
    submit() {
      console.log('Creating');
    }
  }
}
</script>