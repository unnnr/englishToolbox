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
    
    <posts-pool ref="pool"/>

  </main>
</template>

<script>
import PostSelected from '@components/posts/PostSelected'
import VideoCreator from '@pages/video/VideoCreator'
import VideoPlayer from '@pages/video/VideoPlayer'
import VideoEditor from '@pages/video/VideoEditor'
import HandlePost from'@mixins/HandlePost'
import FilterBar from '@components/layout/FilterBar'
import PostsPool from '@components/posts/PostsPool'
import Videos from '@models/Videos'

export default {
  components: {
    PostSelected,
    VideoCreator,
    VideoPlayer,
    VideoEditor,
    FilterBar,
    PostsPool
  },

  mixins: [ HandlePost ],

  provide: {
    model: Videos
  }
}
</script>