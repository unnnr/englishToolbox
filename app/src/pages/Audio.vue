<template>
 <main class="posts">

    <filter-bar/>

    <post-selected
      :editor-has-changes="editorHasChanges"
      :creator-has-changes="creatorHasChanges">

      <template #creator>
        <audio-creator ref="creator"/>
      </template>

      <template #editor>
        <audio-editor ref="editor"/>
      </template>

      <template #player>
        <audio-player/>
      </template>

    </post-selected>
    
    <posts-pool/>

  </main>
</template>

<script>
import PostSelected from '@components/posts/PostSelected'
import AudioCreator from '@pages/audio/AudioCreator'
import AudioPlayer from '@pages/audio/AudioPlayer'
import AudioEditor from '@pages/audio/AudioEditor'
import HandlePost from'@mixins/HandlePost'
import FilterBar from '@components/layout/FilterBar'
import PostsPool from '@components/posts/PostsPool'
import Audio from '@models/Audio'

export default {
  components: {
    PostSelected,
    AudioCreator,
    AudioPlayer,
    AudioEditor,
    FilterBar,
    PostsPool
  },

  mixins: [ HandlePost ],

  provide: {
    model: Audio
  }
}
</script>