<template>
  <div class="addition addition--mobile">
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
import PostComments from '@components/posts/PostComments'
import PostInfo from '@components/posts/PostInfo'
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

  computed: {
    editorHeight() {
      let editor = this.$refs.editor;
      if (!!!editor)
        return;

      return editor.offsetHeight;
    },

    commentsInfoHeight() {
      let presentor = this.$refs.presentor;
      if (!!!presentor)
        return;

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
    }
  },

  mounted() {
    if (this.editing || this.creating)
      this.editorToggle(true);
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
      let [info, editor, comments] = 
        this.getShrinkable();

      comments.open();
      info.open();
      editor.close();
    },

    showEditor() {
      let [info, editor, comments] = 
        this.getShrinkable();

      comments.close();
      info.close();
      editor.open();
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

.addition__tab-wrapper.shrinkable--closed
  display: none

addition--mobile .addition__tab
  height: auto

.addition__tab-wrapper
  webkit-box-shadow: 0 5px 25px 0 rgba(132, 132, 153, 0.15)
  box-shadow: 0 5px 25px 0 rgba(132, 132, 153, 0.15)
  
</style>
