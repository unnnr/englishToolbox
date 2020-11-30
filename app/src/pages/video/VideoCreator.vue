<template>
  <video-processor 
    ref="processor"
    :request="submit"/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'
import Videos from '@models/Videos'

export default {
  components: {
    VideoProcessor
  },

  methods: {
    hasChanges() {
      let processor = this.$refs.processor;
      return processor.hasChanges();
    },
    
    async submit(data) {
      let post = await Videos.create(data);

      bus.dispatch('post-created', { post });
    }
  }
}
</script>