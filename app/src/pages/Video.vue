<template>
    <post-layout>
      <video-player/>
      <video-addition/>
    </post-layout>
</template>

<script>

import PostLayout from '@layouts/PostLayout'
import VideoPlayer from '@pages/video/VideoPlayer'
import VideoAddition from '@pages/video/VideoDetails'

export default {
  name: 'videos',
  
  components: {
    PostLayout, VideoPlayer, VideoAddition
  }
}
</script>