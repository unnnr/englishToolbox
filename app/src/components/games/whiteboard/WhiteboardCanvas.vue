<template>
  <div class="whiteboard__canvas">
    <whiteboard-drawings
      :drawings="drawings"/>
      
    <canvas 
      ref="canvas"
      :height="height"
      :width="width"/>
  </div>
</template>

<script>
import WhiteboardDrawings from '@components/games/whiteboard/WhiteboardDrawings'
import Drawings from '@services/whiteboard/WhiteboardDrawings'

export default {
  components: { 
    WhiteboardDrawings,
  },

  props: {
    config: { type: Object, deufault: {}}
  },

  computed: {
    tool() {
      return this.config.tool;
    }
  },

  data() {
    return {
      drawings: new Drawings(),
      width: 1400,
      height: 600,
    }
  },

  methods: {
    createContext() {
      let canvas = this.$refs.canvas;
      return canvas ? canvas.getContext("2d") : null;
    },

    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    },

    computeCoords(event) {  
      let offset = 
        event.target.getBoundingClientRect();

      let canvas = this.$refs.canvas;
      if (!!!canvas)
        return;

      let position = {
        x: (event.clientX - offset.left) * (this.width / canvas.offsetWidth),
        y: (event.clientY - offset.top) * (this.height / canvas.offsetHeight)
      }

      return {
        x: Number(position.x.toFixed(2)),
        y: Number(position.y.toFixed(2))
      }
    },

    click(event) {
      if (!!!this.tool)
        return;

      this.context = this.createContext();

      let coords = this.computeCoords(event);
      this.tool.click(coords, this.context, this.drawings, this.config);
    },

    draw(event) {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      this.tool.move(coords, this.context, this.drawings, this.config);
    },

    release() {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      let composend = this.tool.release(
        coords, this.context, this.drawings, this.config);

      if (composend)
        this.clear();
    },
  }
}
</script>

<style lang="sass">

.whiteboard__canvas
  position: relative
  height: 100%
  width: 100%
  
.whiteboard__canvas > *
  position: absolute
  height: 100%
  width: 100%

</style>