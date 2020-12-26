<template>
  <div class="whiteboard__element whiteboard__group whiteboard__group--controls">
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
    
<!--     <div class="whiteboard__element whiteboard__element--small whiteboard__element">
      <button class="whiteboard__button-control--minus whiteboard__button-control whiteboard__button"></button>
      <div class="whiteboard__separator"></div>
      <span class="whiteboard__scale-count">100%</span>
      <div class="whiteboard__separator"></div>
      <button class="whiteboard__button-control--plus whiteboard__button-control whiteboard__button"></button>
    </div> -->
  </div>
</template>

<script>
export default {
  inject: ['$drawings'], 

  computed: {
    drawings() {
      return this.$drawings();
    }
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