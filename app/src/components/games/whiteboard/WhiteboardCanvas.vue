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
import Pencil from '@services/whiteboard/WhiteboardPencil'

export default {
  data() {
    return {
      width: 1400,
      height: 600,
    }
  },

  mounted() {
    this.tool = new Pencil();
    this.drawings = new DrawingsCollection();
  },


  methods: {
    createContext() {
      let canvas = this.$refs.activeLayer;
      if (!!!canvas)
        return null;

      return canvas.getContext("2d");
    },

    clear() {
      console.log('clearing')
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

      this.context = this.createContext();

      let coords = this.computeCoords(event);
      this.tool.init(coords, this.context);
    },

    draw(event) {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      this.tool.move(coords, this.context);
    },

    stop() {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      let composend = this.tool.release();

      if (composed)
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

.whiteboard__canvas canvas
  position: absolute
  height: 100%
  width: 100%

</style>