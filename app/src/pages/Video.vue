<template>
 <main class="posts">
    <post-selected
      :editor-has-changes="editorHasChanges"
      :creator-has-changes="creatorHasChanges">

      <template #creator>
        <video-creator ref="creator"/>
      </template>

      <template #editor>
        <video-editor ref="editor"/>
      </template>

      <template #player>
        <video-player/>
      </template>

    </post-selected>

    <pool/>

  </main>
</template>

<script>
import HandlePost from'@mixins/HandlePost'
import PostSelected from '@components/posts_new/PostSelected'
import VideoCreator from '@pages/video/VideoCreator'
import VideoEditor from '@pages/video/VideoEditor'
import VideoPlayer from '@pages/video/VideoPlayer'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    PostSelected,
    VideoCreator,
    VideoPlayer,
    VideoEditor,
    Pool
  },

  mixins: [HandlePost]
}
</script>