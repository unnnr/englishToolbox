<template>
  <div class="addition">
    <div 
      class="addition__tabs"
      ref="shrinkable"
      :to="shrinkTo"
      :from="shrinkFrom">

      <shrinkable :speed=".7" ref="info"> 
        <post-info  :mobile="true"/>
      </shrinkable>

      <shrinkable :speed=".7" ref="comments" > 
        <post-comments  :mobile="true"/>
      </shrinkable>

      <shrinkable :speed=".7"  ref="editor" shrinked-by-default> 
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

    hideEditor() {
      let editor = this.$refs.editor;
      let comments = this.$refs.comments;
      let info = this.$refs.infor;

      if (!!!editor || !!!comments || !!!info)
        return;

     
      comments.close();
      info.close();

      setTimeout(editor.open, 4000);
    },

    showEditor() {
      let editor = this.$refs.editor;
      let comments = this.$refs.comments;
      let info = this.$refs.infor;

      if (!!!editor || !!!comments || !!!info)
        return;

      comments.open();
      info.open();

      setTimeout(editor.close, 1000);
    },
    
    async editorToggle(value) {
      let editor = this.$refs.editor;
      let comments = this.$refs.comments;
      let info = this.$refs.info;

      if (!!!editor || !!!comments || !!!info)
        return;
      
      await this.$nextTick();


      // showing editor
      if (value) {        
        comments.close();
        info.close()

        setTimeout(editor.open, 1000);
      }
      // hidding editor
      else  {
        editor.close();

        setTimeout(comments.open, 1000);
        setTimeout(info.open, 1000);

      }

      return;
      let shrinkable = this.$refs.shrinkable;
      if (!!!shrinkable)
        return;
      
      // Showing editor
      if (value) {

      console.log('showing');
        this.editorShown = true;
        await this.$nextTick();

        this.$refs.shrinkable.close();
      }
      // Hiding editor
      else {

      console.log('hidding');
        
        this.editorShown = false;
        await this.$nextTick();

        shrinkable.open();
      }
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
  
</style>
