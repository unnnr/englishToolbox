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
    
    <pool 
      ref="pool" 
      :posts="videos"
      @deleting="deletePost"/>

  </main>
</template>

<script>

import VideoCreator from '@pages/video/VideoCreator'
import VideoEditor from '@pages/video/VideoEditor'
import VideoPlayer from '@pages/video/VideoPlayer'
import PostSelected from '@components/posts_new/PostSelected'
import FilterBar from '@components/layout/FilterBar'
import Pool from '@components/cards_new/Pool'
import HandlePost from'@mixins/HandlePost'
import Videos from '@models/Videos'

export default {
  components: {
    PostSelected,
    VideoCreator,
    VideoPlayer,
    VideoEditor,
    FilterBar,
    Pool
  },

  mixins: [ HandlePost ],

  data() {
    return {
      videos: [],
    }
  },

  mounted() {
    this.loadVideos();
  },

  methods: {
    async loadVideos() {
      this.videos = await Videos.all();
    },

    async deletePost(event) {
      try {
        let id = event.post.id;

        await Videos.delete(id);

        event.deleted();
      }
      catch(error) {
        console.log(error);
        event.failed(error);
      }
    }
  }
}
</script>