<template>
  <div class="addition">
    <div 
      class="addition__tabs"
      ref="shrinkable">

      <shrinkable  
        class="addition__tab-wrapper"
        ref="info" 
        :speed=".7">

        <post-info  :mobile="true"/>
      </shrinkable>

      <shrinkable 
        class="addition__tab-wrapper"
        ref="comments"  
        :speed=".7">

        <post-comments  :mobile="true"/>
      </shrinkable>

      <shrinkable 
        class="addition__tab-wrapper"
        ref="editor"
        :speed=".7"
        shrinked-by-default>
         
        <slot/>
      </shrinkable>

    </div>
  </div>
</template>

<script>
import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'
import bus from '@services/eventbus'
import Shrinkable from '@components/Shrinkable'

export default {
  components: {
    Shrinkable,
    PostComments,
    PostInfo, 
  },

  props: {
    editing: { type: Boolean, default: false },

    creating: {type: Boolean, default: false },
  },

  data() {
    return {
      asd_editorShown: false
    }
  },

  computed: {
    editorHeight() {
      let editor = this.$refs.editor;
      if (!!!editor)
        return;

      console.log('tp', editor.offsetHeight);

      return editor.offsetHeight;
    },

    commentsInfoHeight() {
      let presentor = this.$refs.presentor;
      if (!!!presentor)
        return;

      console.log('from', presentor.offsetHeight);
      return presentor.offsetHeight;
    },

    editorShown() {
      return this.creating || this.editing;
    }
  },

  watch: {
    editing(value) {
      this.editorToggle(value);
    },   
    
    creating(value) {
      this.editorToggle(value);
    },
  },

  methods: {
    shrinkTo() {
      return this.editorHeight + 'px';
    },

    shrinkFrom() {
      return this.commentsInfoHeight + 'px';
    },

    getShrinkable() {
      return [
        this.$refs.info,
        this.$refs.editor,
        this.$refs.comments,
      ];
    },

    hideEditor() {
      let [info, editor, comments] = this.getShrinkable();

      let editorShowing = 
        this.$options.editorShowing;

      // Closing editor
      if (editorShowing !== null)
        clearTimeout(editorShowing)
      else
        editor.close();

      this.$options.presentorShowing = setTimeout(() => {
        // Resetting Timeout
        this.$options.presentorShowing = null;

        comments.open();
        info.open();
      }, 500);
    },

    showEditor() {
      let [info, editor, comments] = this.getShrinkable();

      let presentorShowing = 
        this.$options.presentorShowing;

      // Closing comments and info
      if (presentorShowing)
        clearTimeout(presentorShowing);
      else {
        comments.close();
        info.close();
      }
      
      this.$options.editorShowing = setTimeout(() => {
        // Resetting Timeout
        this.$options.editorShowing = null;

        editor.open();
      }, 500);
    },
    
    async editorToggle(value) {
      if (value)      
        this.showEditor();
      else  
        this.hideEditor();
    }
  }
}
</script>

<style lang="sass">

.fade-enter-active.editor, .fade-leave-active.editor
  position: absolute !important

</style>


<style lang="sass">

.addition__tab
  height: auto

.addition__tab-wrapper
  webkit-box-shadow: 0 5px 25px 0 rgba(132, 132, 153, 0.15)
  box-shadow: 0 5px 25px 0 rgba(132, 132, 153, 0.15)
  
</style>
