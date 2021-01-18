<template>
  <whiteboard-events-grip 
    class="whiteboard game"
    :class="{'whiteboard--painting': drawing,
             'inspecting': inspecting}"
    :active="drawing"
    @move="move"
    @click="click"
    @release="release">

    <whiteboard-drawings
      @select="select"/>

    <whiteboard-canvas
      :active="drawing"
      ref="canvas"/>

    <whiteboard-ui/>

  </whiteboard-events-grip>
</template>

<script>
import WhiteboardEventsGrip from '@components/games/whiteboard/WhiteboardEventsGrip'
import WhiteboardPresentor from '@components/games/whiteboard/WhiteboardDrawings'
import WhiteboardDrawings from '@components/games/whiteboard/WhiteboardDrawings'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUi from '@components/games/whiteboard/WhiteboardUI'
import Shortcuts from '@services/whiteboard/Shortcuts'

export default {
  components: {
    WhiteboardEventsGrip,
    WhiteboardDrawings,
    WhiteboardCanvas,
    WhiteboardUi
  },

  inject: ['$drawings', '$config'], 

  data() {
    return {
      drawing: false,
      canvas: null,
    }
  },

  computed: {
    inspecting() {
      return this.config.inspecting;
    },

    tool() {
      return this.config.tool;
    },

    drawings() {
      return this.$drawings();
    },

    config() {
      return this.$config();
    },
  },

  mounted() {
    this.canvas = this.$refs.canvas;

    Shortcuts.listen(
      Shortcuts.CLOSE, this.$options.$resolve = this.resolve.bind(this));
  },

  beforeDestroy() {
    Shortcuts.forgot(
      Shortcuts.CLOSE, this.$options.$resolve);
  },

  methods: {
    resolve() {
      if (!!!this.drawing || !!!this.tool || !!!this.tool.resolve)
        return;

      let context = this.canvas.context;
      this.tool.resolve(context, this.config);
      this.drawing = false;
    },

    computeCoords(event) {  
      let offset = 
        this.$el.getBoundingClientRect();

      let position = {
        x: (event.clientX - offset.left) * (this.config.width / this.$el.offsetWidth),
        y: (event.clientY - offset.top) * (this.config.height / this.$el.offsetHeight)
      }

      return {
        x: Number(position.x.toFixed(2)),
        y: Number(position.y.toFixed(2))
      }
    },
    
    click(event, el) {
      if (!!!this.tool)
        return;

      let context = this.canvas.context;
      let coords = this.computeCoords(event);
      let drawigns = this.drawigns;
      let config = this.config

      this.tool.click(coords, context, drawings, config, el);

      this.drawing = this.tool.painting;
    },

    move(event) {
      if (!!!this.drawing)
        return;

      let context = this.canvas.context;
      let coords = this.computeCoords(event);
      let drawigns = this.drawigns;
      let config = this.config;

      this.tool.move(coords, context, drawings, config);
    },

    release(event) {
      if (!!!this.tool)
        return;

      let drawigns = this.drawigns;
      let context = this.canvas.context;
      let coords = this.computeCoords(event);
      let config = this.config

      this.tool.release(coords, context, drawings, config);

      this.drawing = this.tool.painting;
    },

    select({event, el}) {
      this.click(event, el);
    }
  }
}
</script>