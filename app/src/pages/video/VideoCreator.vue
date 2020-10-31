<template>
  <video-processor 
    :request="submit"/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'

import FakeData from '@services/FakeData';
import getYouTubeID from 'get-youtube-id'

export default {
  components: {
    VideoProcessor
  },

  methods: {
    submit(data) {
      let url = data.get('videoUrl');
      let description = data.get('description');

      let post = FakeData.createPost();
      post.description = description;
      post.videoId = getYouTubeID(url);
      post.thumbnail = `https://img.youtube.com/vi/${post.videoId}/sddefault.jpg`;
      
      bus.dispatch('post-created', { post });
    }
  }
}
</script>