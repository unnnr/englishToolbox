<template>
  <div class="addition">
    <div class="addition__tabs">
      <transition name="fade">
        <post-info v-if="!!!editorShown"/>
      </transition>

      <transition name="fade">
        <post-comments v-if="!!!editorShown"/>
      </transition>
      
      <transition name="fade">
        <slot v-if="editorShown"/>
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
    editing: { type: Boolean, default: false },

    creating: {type: Boolean, default: false }
  },

  computed: {
    editorShown() {
      return this.editing || this.creating;
    }
  }
}
</script>

<style lang="sass">

.fade-enter-active.editor, .fade-leave-active.editor
  position: absolute !important

</style>