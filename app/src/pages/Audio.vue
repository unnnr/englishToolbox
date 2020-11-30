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
// services
import Audio from '@models/Audio'

// mixins
import HandlePost from'@mixins/HandlePost'

// coponents
import PostSelected from '@components/posts/PostSelected'
import AudioCreator from '@pages/audio/AudioCreator'
import AudioPlayer from '@pages/audio/AudioPlayer'
import AudioEditor from '@pages/audio/AudioEditor'
import FilterBar from '@components/layout/FilterBar'
import PostsPool from '@components/posts/PostsPool'


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