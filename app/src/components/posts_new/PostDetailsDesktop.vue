<template>
  <div class="addition">
    <div class="addition__header">
      <button 
        class="addition__button  text-fifth"
        :disabled="creating"
        :class="{
          'addition__button--active': infoSelected,
          'addition__button--disabled': creating}"
        @click="selectInfo">

        Description
      </button>

      <button 
        class="addition__button text-fifth" 
        :disabled="creating"
        :class="{
          'addition__button--active': commentsSelected,
          'addition__button--disabled': creating}"
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
    creating: { type: Boolean, default: false },

    editing: { type: Boolean, default: false }
  },

  inject: [ '$target' ],

  data() {
    return {
      activeTab: 'info',
    }
  },

  computed: {
    target() {
      return this.$target();
    },

    infoSelected() {
      return !!!this.creating && !!!this.editing
        && this.activeTab === 'info';
    },

    commentsSelected() {
      return !!!this.creating && !!!this.editing
        && this.activeTab === 'comments';
    },

    editorSelected() {
      return this.creating || this.editing;
    },
    
    editorShown() {
      return true;
    },

  },

  methods: {
    select(tabName) {
      let _this = this;

      this.$emit('switching', {
        from: this.activeTab,
        to: tabName,
        
        switch() {
          _this.activeTab = tabName
        }
      });
    },
    
    selectInfo() {
      this.select('info');
    },

    selectComments() {
      this.select('comments');
    },

    selectEditor() {
      bus.dispatch('post-editing' , { 
        post: this.target
      });
    },

    showInfo() {
      this.activeTab = 'info';
    }
  }
}
</script>