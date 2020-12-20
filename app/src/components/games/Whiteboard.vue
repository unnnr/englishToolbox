<template>
  <div class="whiteboard">
    <whiteboard-ui/>

    <whiteboard-events-grip
      v-if="greepShown"
      :target="greepTarget"/>

    <whiteboard-canvas
      v-if="canvasShown"/>

    <whiteboard-drawings/>
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
    WhiteboardDrawings,
    WhiteboardCanvas,
    WhiteboardUi
  },


  provide() {
    const _this = this;

    return {
      $drawings: () => _this.drawings,

      $config: () => _this.config
    }
  },

  data() {
    return {
      drawings: new DrawingsCollection,
      config: {
        tool: null,
        size: null,
        color: null,

        width: 1400,
        height: 600,
      },

      greepTarget: null,
      canvasShown: false,
      greepShown: false,
    }
  },

  mounted() {
    // let component = this.$refs.canvas;
    // this.greepTarget = component.canvas;
  }
}
</script>