<template>
 <main class="posts">
    <post-selected>

      <template #player>
        <video-player/>
      </template> 

      <template #editor>
        <post-editor/>
      </template>

    </post-selected>

    <pool/>

  </main>
</template>

<script>
import PostSelected from '@components/posts_new/PostSelected'
import PostEditor from '@components/posts_new/PostEditor_TEMP'
import Pool from '@components/cards_new/Pool'

import VideoPlayer from '@pages/video/VideoPlayer'

export default {
  components: {
    VideoPlayer,
    PostSelected,
    PostEditor,
    Pool
  }
}
</script>