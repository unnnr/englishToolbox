<template>
  <div class="whiteboard__canvas">
    <canvas 
      ref="canvas"
      :height="height"
      :width="width"/>

    <canvas 
      ref="activeLayer"
      :height="height"
      :width="width"
      @mousedown="start"
      @mouseleave="stop"
      @mouseup="stop"
      @mousemove="draw"/>
  </div>
</template>

<script>
import { Pencil } from '@services/WhiteboardTools'

export default {
  data() {
    return {
      width: 1400,
      height: 600,
      tool: null,
      painting: false
    }
  },

  mounted() {
    this.tool = new Pencil();
  },


  methods: {
    createContext() {
      let canvas = this.$refs.activeLayer;
      if (!!!canvas)
        return null;

      return canvas.getContext("2d");
    },

    computeCoords(event) {
      let position = 
        event.target.getBoundingClientRect();

      let canvas = this.$refs.activeLayer;
      if (!!!canvas)
        return;
      
      return {
        x: (event.clientX - position.left) * (this.width / canvas.offsetWidth),
        y: (event.clientY - position.top) * (this.height / canvas.offsetHeight)
      }
    },

    start(event) {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      this.context = this.createContext();

      this.tool.init(this.context, coords);
      this.painting = true; 
    },

    draw(event) {
      if (!!!this.painting)
        return;

      let coords = this.computeCoords(event);
      this.tool.move(this.context, coords);
    },

    stop() {
      if (!!!this.painting)
        return;

      this.painting = false;
      if (!!!this.tool.release())
        return;

      console.log(this.tool.compose());
    },
  }
}
</script>

<style lang="sass">

.whiteboard__canvas
  position: relative
  height: 100%
  width: 100%

.whiteboard__canvas canvas
  position: absolute
  height: 100%
  width: 100%

</style>