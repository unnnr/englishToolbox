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
    
    <pool ref="pool" :posts="posts"/>

  </main>
</template>

<script>

import PostSelected from '@components/posts/PostSelected'
import FilterBar from '@components/layout/FilterBar'
import Pool from '@components/cards_new/Pool'
import HandlePost from'@mixins/HandlePost'
import AudioPlayer from '@pages/audio/AudioPlayer'

export default {
  components: {
    PostSelected,
    AudioPlayer,
    FilterBar,
    Pool
  },

  mixins: [ HandlePost ],

  data() {
    return {
      posts: []
    }
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