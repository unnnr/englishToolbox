<template>
  <div class="addition">
    <shrinkable 
      class="addition__tabs"
      ref="shrinkable"
      :to="shrinkTo">

      <transition name="fade">
        <slot v-if="editorShown"/>
      </transition>

      <transition name="fade">
        <post-info v-if="!!!editorShown"/>
      </transition>

      <transition name="fade">
        <post-comments v-if="!!!editorShown"/>
      </transition>

    </shrinkable>
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

    creating: {type: Boolean, default: false }
  },

  data() {
    return {
      editorShown: false
    }
  },

  computed: {
    editorHeight() {
      let shrinkable = this.$refs.shrinkable;
      if (!!!shrinkable)
        return 0;

      let editor = shrinkable.$el.children[0];
      if (!!!editor)
        return 0;

      return editor.offsetHeight;
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
    
    async editorToggle(value) {
      let shrinkable = this.$refs.shrinkable;
       if (!!!shrinkable)
        return;
      
      // Showing editor
      if (value) {
        this.editorShown = true;
        await this.$nextTick();

        this.$refs.shrinkable.close();
      }
      // Hiding editor
      else {
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