<template>
  <div class="addition">

    <div class="addition__header">
      <button 
        class="addition__button  text-fifth"
        :class="{'addition__button--active': infoSelected}"
        :disabled="onlyEditor"
        @click="selectInfo">

        Description
      </button>

      <button 
        class="addition__button text-fifth" 
        :class="{'addition__button--active': commentsSelected}"
        :disabled="onlyEditor"
        @click="selectComments">

        Comments
      </button>

      <!-- The editor can be hidden when the user -->
      <!-- doesn't have appropriate permissions   -->
      <button 
        class="addition__button text-fifth"
        v-if="editorShown"
        :class="{'addition__button--active': editorSelected}"
        @click="selectEditor">

        Editor
      </button>
    </div>

    <div class="addition__tabs">
      <transition name="fade">

        <post-info v-if="infoSelected"/>

        <post-comments v-if="commentsSelected"/>
        
        <slot v-if="editorShown && editorSelected"/>

      </transition>
    </div>
  </div>
</template>

<script>

import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'

export default {
  components: {
    PostComments,
    PostInfo, 
  },

  props: {
    onlyEditor: { type: Boolean, default: false }
  },

  data() {
    return {
      activeTab: 'info'
    }
  },

  computed: {
    infoSelected() {
      return !!!this.onlyEditor && this.activeTab === 'info';
    },

    commentsSelected() {
      return  !!!this.onlyEditor && this.activeTab === 'comments';
    },

    editorSelected() {
      return this.onlyEditor || this.activeTab === 'editor';
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
      this.activeTab = 'editor';
    }
  }
}
</script>