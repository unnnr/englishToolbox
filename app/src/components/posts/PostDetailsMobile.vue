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
import Shrinkable from '@components/Shrinkable'
import PostInfo from '@components/posts/PostInfo'
import bus from '@services/eventbus'

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
