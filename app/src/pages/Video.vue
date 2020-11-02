<template>
 <main class="posts">
   <!--  <post-selected
      :editor-component="videoEditor"
      :creator-component="videoCreator">

      <template #player>
        <video-player/>
      </template> 

    </post-selected> -->

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
  },

  data() {
    return {
      videoCreator: VideoCreator,
      videoEditor: VideoEditor
    }
  }
}
</script>