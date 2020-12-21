<template>
  <whiteboard-events-grip 
    class="whiteboard"
    :target="canvas">

    <whiteboard-drawings/>

    <whiteboard-canvas
      v-show="canvasShown"
      ref="canvas"/>

    <whiteboard-ui/>

  </whiteboard-events-grip>
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

  computed: {
    inspecting() {
      return this.config.inspecting;
    },

    canvasShown(value) {
      return !!!this.inspecting;
    },

    greepShown() {
      return !!!this.inspecting && !!!this.loading;
    },
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
        inspecting: false
      },

      loading: false,
      canvas: null
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
  }
}
</script>