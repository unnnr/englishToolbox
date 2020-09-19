<template>
    <post-layout>
      <video-player/>
      <video-details/>
    </post-layout>
</template>

<script>

import PostLayout from '@layouts/PostLayout'
import VideoPlayer from '@pages/video/VideoPlayer'
import VideoDetails from '@pages/video/VideoDetails'

export default {
  name: 'videos',
  
  components: {
    PostLayout, VideoPlayer, VideoDetails
  }
}
</script>