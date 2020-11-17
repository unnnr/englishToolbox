<template>
 <main class="posts">

    <filter-bar/>

    <post-selected
      :editor-has-changes="editorHasChanges"
      :creator-has-changes="creatorHasChanges">

      <template #creator>
      </template>

      <template #editor>
      </template>

      <template #player>
        <audio-player/>
      </template>

    </post-selected>
    
    <posts-pool ref="pool"/>

  </main>
</template>

<script>

import PostSelected from '@components/posts/PostSelected'
import AudioPlayer from '@pages/audio/AudioPlayer'
import HandlePost from'@mixins/HandlePost'
import FilterBar from '@components/layout/FilterBar'
import PostsPool from '@components/posts/PostsPool'
import Audio from '@models/Audio'

export default {
  components: {
    PostSelected,
    AudioPlayer,
    FilterBar,
    PostsPool,
  },

  mixins: [ HandlePost ],

  provide: {
    model: Audio
  },

  mounted() {
    this.loadPosts();
  },

  methods: {
    loadPosts() {
      this.posts = [ {}, {} ]
    }
  }
}
</script>