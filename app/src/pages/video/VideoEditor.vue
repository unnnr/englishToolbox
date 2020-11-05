<template>
  <video-processor 
    ref="processor"
    :request="submit"
    editing/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'
import bus from '@services/eventbus';

import getYouTubeID from 'get-youtube-id'
import FakeData from '@services/FakeData';

export default {
  components: {
    VideoProcessor
  },

  inject: [ '$target' ],

  computed: {
    TEMP_target() {
      return this.$target();
    },
  },

  methods: {
    hasChanges() {
      let processor = this.$refs.processor;

      return processor.hasChanges();
    },

    submit(data) {

      // sending data to API

      let url = data.get('videoUrl');
      let description = data.get('description');
      
      let post = this.TEMP_target;
      post.description = description;
      post.videoId = getYouTubeID(url);
      post.thumbnail = `https://img.youtube.com/vi/${post.videoId}/sddefault.jpg`;

      bus.dispatch('post-edited', { post });
    }
  }
}
</script>