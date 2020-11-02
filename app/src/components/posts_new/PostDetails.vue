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
        
        <slot v-if="editorShown && editorSelected" ref="editor"/>

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
  },

  data() {
    return {
      activeTab: 'info',
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
    pendSelection(tabName) {
      let _this = this;

      this.$emit('switching', {
        from: this.activeTab,
        to: tabName,
        
        switch() {
          _this.activeTab = tabName
        }
      });
    },

    select(tabName, forced = true) {
      if (forced)
        return this.activeTab = tabName;;
      
      this.pendSelection(tabName);
    },

    selectInfo() {
      this.select('info', false);
    },

    selectComments() {
      this.select('comments', false);
    },

    selectEditor() {
      this.select('editor', false);
    }
  }
}
</script>