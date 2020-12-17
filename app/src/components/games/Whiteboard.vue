<template>
  <div class="whiteboard">
    <whiteboard-canvas  
      ref="canvas"/>
    
    <whiteboard-events-grip
      v-if="canvas"
      :target="canvas"/>

    <whiteboard-controls/>

    <whiteboard-config/>

    <whiteboard-users/>
  </div>
</template>

<script>
import WhiteboardEventsGrip from '@components/games/whiteboard/WhiteboardEventsGrip'
import WhiteboardControls from '@components/games/whiteboard/interface/WhiteboardControls'
import WhiteboardConfig from '@components/games/whiteboard/interface/WhiteboardConfig'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'

export default {
  components: {
    WhiteboardEventsGrip,
    WhiteboardControls,
    WhiteboardConfig,
    WhiteboardCanvas,
    WhiteboardCanvas,
    WhiteboardUsers
  },

  data() {
    return {
      canvas: null
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
  }
}
</script>