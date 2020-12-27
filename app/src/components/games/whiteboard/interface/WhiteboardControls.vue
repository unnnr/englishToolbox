<template>
  <div class="whiteboard__group whiteboard__group--controls">
    <div class="whiteboard__element--small whiteboard__element">
      <button 
        class="whiteboard__button-control--undo whiteboard__button-control whiteboard__button"
        @click="undo">
      </button>

      <div class="whiteboard__separator"></div>
      <button 
        class="whiteboard__button-control--redo whiteboard__button-control whiteboard__button"
        @click="redo">
      </button>
    </div>
  </div>
</template>

<script>
import Shortcuts from '@services/whiteboard/Shortcuts'

export default {
  inject: ['$drawings'], 

  computed: {
    drawings() {
      return this.$drawings();
    }
  },

  mounted() {
    Shortcuts.listen();
  },

  beforeDestroy() {

  },

  methods: {
    redo() {
      drawings.redo();
    },

    undo() {
      drawings.undo();
    }
  }
}
</script>