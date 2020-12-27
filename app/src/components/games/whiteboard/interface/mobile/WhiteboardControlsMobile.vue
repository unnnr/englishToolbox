<template>
  <div class="whiteboard__group-mobile whiteboard__group-mobile--controls">
    <div class="whiteboard__element--square whiteboard__element--small whiteboard__element">
      <button class="whiteboard__button-control--exit whiteboard__button-control"></button>
    </div>

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
    this.$options.$udno = this.undo;
    Shortcuts.listen(Shortcuts.BACK, this.$options.$udno);
  },

  beforeDestroy() {
    Shortcuts.forgot(Shortcuts.BACK, this.$options.$udno);
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