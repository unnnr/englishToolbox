<template>
  <div class="whiteboard">
    <whiteboard-drawings/>

    <whiteboard-canvas
      v-if="canvasShown"
      ref="canvas"/>
    
    <whiteboard-events-grip
      v-if="greepShown"
      :target="greepTarget"/>

    <whiteboard-config/>
    <whiteboard-controls/>
    <whiteboard-users/>
  </div>
</template>

<script>
import WhiteboardEventsGrip from '@components/games/whiteboard/WhiteboardEventsGrip'
import WhiteboardControls from '@components/games/whiteboard/interface/WhiteboardControls'
import WhiteboardDrawings from '@components/games/whiteboard/WhiteboardDrawings'
import WhiteboardConfig from '@components/games/whiteboard/interface/WhiteboardConfig'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'

import DrawingsCollection from '@services/whiteboard/Drawings'


export default {
  components: {
    WhiteboardEventsGrip,
    WhiteboardDrawings,
    WhiteboardControls,
    WhiteboardCanvas,
    WhiteboardConfig,
    WhiteboardUsers
  },


  provide() {
    const _this = this;

    return {
      $drawings: () => _this.drawings,

      $config: () => _this.config
    }
  },

  computed: {
    canvasShown() {
      return true;
    },

    greepTarget() {
      return this.$refs.canvas;
    },

    greepShown() {
      return !!!this.loading && this.greepTarget;
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

      },

      loading: true
    }
  },

  mounted() {
    this.loading = false;
  }

}
</script>