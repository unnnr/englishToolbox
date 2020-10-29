<template>
    <post-layout :model='videos'>
      <video-player/>
      <video-details/>
    </post-layout>
</template>

<script>

import PostLayout from '@components/layout/PostLayout'
import VideoPlayer from '@pages/video/VideoPlayer'
import VideoDetails from '@pages/video/VideoDetails'
import Videos from '@models/Videos';

export default {
  name: 'videos',
  
  components: {
    PostLayout, VideoPlayer, VideoDetails
  },

  data: function () {
    return {
      videos: Videos
    }
  }
}
</script>