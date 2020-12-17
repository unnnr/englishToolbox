<template>
  <canvas 
    ref="canvas"
    :height="height"
    :width="width"
    @mousedown="click"
    @mouseup="release"
    @mouseleave="release"
    @mousemove="draw"/>
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
  
  props: {
    drawings: { type: Object, required: true },

    tool: { type: Object, required: true }
  },

  methods: {
    createContext() {
      let canvas = this.$refs.canvas;
      if (!!!canvas)
        return null;

      return canvas.getContext("2d");
    },

    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    },

    computeCoords(event) {  
      let position = 
        event.target.getBoundingClientRect();

      let canvas = this.$refs.canvas;
      if (!!!canvas)
        return;
      
      return {
        x: (event.clientX - position.left) * (this.width / canvas.offsetWidth),
        y: (event.clientY - position.top) * (this.height / canvas.offsetHeight)
      }
    },

    click(event) {
      if (!!!this.tool)
        return;

      this.context = this.createContext();

      let coords = this.computeCoords(event);
      this.tool.click(coords, this.context, this.drawings);
    },

    draw(event) {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      this.tool.move(coords, this.context, this.drawings);
    },

    release() {
      if (!!!this.tool)
        return;

      let coords = this.computeCoords(event);
      let composend = this.tool.release(coords, this.context, this.drawings);

      if (composend)
        this.clear();
    },
  }
}
</script>