<template>
 <main class="posts">

    <filter-bar/>

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
import FilterBar from '@components/layout/FilterBar'
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
    FilterBar,
    Pool
  },

  mixins: [HandlePost]
}
</script>