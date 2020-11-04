<template>
  <div class="addition">
    <shrinkable class="addition__tabs" ref="shrinkable">

      <transition name="fade">
        <post-info v-if="!!!editorShown"/>
      </transition>

      <transition name="fade">
        <post-comments v-if="!!!editorShown"/>
      </transition>
      
      <transition name="fade">
        <slot v-if="editorShown"/>
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

  computed: {
    shrinkTo() {
      this.$refs.shrinkable;

      return 123;
    },
    
    editorShown() {
      return this.editing || this.creating;
    }
  },

  methods: {
    fixHeight() {
      let shrinkable = this.$refs.shrinkable;

      if (!!!shrinkable)
        return;

      shrinkable.height = shrinkable.contentHeight;
    }
  }
}
</script>

<style lang="sass">

.fade-enter-active.editor, .fade-leave-active.editor
  position: absolute !important

</style>