<template>
  <video-processor 
    :request="submit"
    editing/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'
import bus from '@services/eventbus';

import TEMP_getYouTubeID from 'get-youtube-id'
import Faker from 'faker/locale/ja'


export default {
  components: {
    VideoProcessor
  },

  methods: {
    submit(data) {

      // sending data to API


      bus.dispatch('post-created', { post });
    }
  }
}
</script>