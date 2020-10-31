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
        
        <component 
          v-if="editorShown && editorSelected"
          ref="editor"
          :is="editorComponent"/> 

      </transition>
    </div>
  </div>
</template>

<script>

import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'
import bus from '@services/eventbus'

export default {
  components: {
    PostComments,
    PostInfo, 
  },

  props: {
    onlyEditor: { type: Boolean, default: false },

    editorComponent: { type: Object }
  },

  data() {
    return {
      activeTab: 'info',
    }
  },

  computed: {
    requireWarning: {
      get(){
        let editor = this.$refs.editor;

        return editor 
          && typeof editor.hasChanges === 'function' 
          && editor.hasChangeseditor.hasChanges();
      },

      cache: false
    },

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
    showAlert(callback) {
      bus.dispatch('alert-warning', { 
        message: 'You have unsaved changes. All of them will be lost',
        okay: callback
      });
    },

    switchWithAlert(type) {
      this.showAlert(() => 
        this.activeTab = type
      );
    },

    selectInfo() {
      if (!!!this.requireWarning)
        return this.activeTab = 'info';

      this.switchWithAlert('info');
    },

    selectComments() {
      if (!!!this.requireWarning)
        return this.activeTab = 'comments';

      this.switchWithAlert('comments');
    },

    selectEditor() {
      this.activeTab = 'editor';
    }
  }
}
</script>