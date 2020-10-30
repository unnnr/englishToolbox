<template>
 <main class="posts">
    <post-selected>

      <template #player>
        <video-player/>
      </template> 

      <template #editor>
        <video-editor/>
      </template>

      <template #creator>
        <video-creator/>
      </template>

    </post-selected>

    <pool/>

  </main>
</template>

<script>
import PostSelected from '@components/posts_new/PostSelected'
import VideoCreator from '@pages/video/VideoCreator'
import VideoEditor from '@pages/video/VideoEditor'
import VideoPlayer from '@pages/video/VideoPlayer'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    PostSelected,
    VideoCreator,
    VideoEditor,
    VideoPlayer,
    Pool
  }
}
</script>