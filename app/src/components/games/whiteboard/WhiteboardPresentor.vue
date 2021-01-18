<template>
  <div class="whiteboard game">
    <whiteboard-drawings-preview/>

    <whiteboard-users/>

     <div    
      v-if="mobile" 
      class="whiteboard__group-mobile whiteboard__group-mobile--controls">

      <div class="whiteboard__element--square whiteboard__element--small whiteboard__element">
        <button 
          class="whiteboard__button-control--exit whiteboard__button-control" 
          @click="close">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteboardDrawingsPreview from '@components/games/whiteboard/WhiteboardDrawingsPreview.vue'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'

export default {
  components: { 
    WhiteboardDrawingsPreview,
    WhiteboardUsers
  },

  inject: ['$mobile'], 

  computed: {
    mobile() {
      return this.$mobile();
    }
  },

  methods: {
    close() {
      document.exitFullscreen();
    }
  }
}
</script>