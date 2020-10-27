<template>
  <div class="addition">

    <div class="addition__header">
      <button @click="selectInfo">
        Description
      </button>

      <button @click="selectComments">
        Comments
      </button>

      <!-- The editor can be hidden when the user -->
      <!-- doesn't have appropriate permissions   -->
      <button 
        v-if="editorShown"
        @click="selectEditor">

        Editor
      </button>
    </div>

    <div class="addition__tabs">

      <post-info v-if="infoSelected"/>

      <post-comments v-if="commentsSelected"/>
      
      <slot  v-if="editorShown && editorSelected"/>
    </div>
  </div>
</template>

<script>

import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'

export default {
  components: {
    PostComments,
    PostInfo
  },

  data() {
    return {
      activeTab: 'info'
    }
  },

  computed: {
    infoSelected() {
      console.log(this.$slots);
      
      return this.activeTab === 'info';
    },

    commentsSelected() {
      return this.activeTab === 'comments';
    },

    editorSelected() {
      return this.activeTab === 'editor';
    },
    
    editorShown() {
      return true;
    }
  },

  methods: {
    selectInfo() {
      this.activeTab = 'info';
    },

    selectComments() {
      this.activeTab = 'comments';
    },

    selectEditor() {
      console.log(this.$slots);

      this.activeTab = 'editor';
    },
  }
}
</script>