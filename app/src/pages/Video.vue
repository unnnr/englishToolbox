<template>
 <main class="posts">
    <video-selected/>

    <pool/>

  </main>
</template>

<script>
import VideoSelected from '@pages/video/VideoSelected'
import VideoCreator from '@pages/video/VideoCreator'
import VideoEditor from '@pages/video/VideoEditor'
import VideoPlayer from '@pages/video/VideoPlayer'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    VideoSelected,
    // VideoPlayer,
    Pool
  }
}
</script>