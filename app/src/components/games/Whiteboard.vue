<template>
  <div class="whiteboard">
    <whiteboard-canvas  
      ref="canvas"
      :config="config"/>
    
    <whiteboard-events-grip
      v-if="canvas"
      :target="canvas"/>

    <whiteboard-config
      ref="config"/>

    <whiteboard-controls/>

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
      canvas: null,
      config: {}
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.config = this.$refs.config.config;
  }
}
</script>