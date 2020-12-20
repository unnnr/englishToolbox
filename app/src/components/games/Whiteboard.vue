<template>
  <div class="whiteboard">
    <whiteboard-events-grip
      v-if="greepShown"
      :target="canvas"/>

    <whiteboard-ui/>

    <whiteboard-canvas  
      :config="config"/>

    <whiteboar-drawings
      :drawings="drawings"/>
  </div>
</template>

<script>
import WhiteboardEventsGrip from '@components/games/whiteboard/WhiteboardEventsGrip'
import WhiteboardDrawings from '@components/games/whiteboard/WhiteboardDrawings'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUi from '@components/games/whiteboard/WhiteboardUI'

import DrawingsCollection from '@services/whiteboard/Drawings'


export default {
  components: {
    WhiteboardEventsGrip,
    WhiteboardControls,
    WhiteboardConfig,
    WhiteboardCanvas,
    WhiteboardCanvas,
    WhiteboardUsers
  },

  provide() {

  },

  data() {
    return {
      $drawings: new DrawingsCollection,

      canvas: null,
      greepShown: false,
      config: {}
    }
  },

  mounted() {
    // this.canvas = this.$refs.canvas;
    this.config = this.$refs.config.config;
  }
}
</script>