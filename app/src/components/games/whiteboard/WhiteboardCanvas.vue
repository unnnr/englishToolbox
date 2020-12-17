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
import Pencil from '@services/whiteboard/WhiteboardPencil'

export default {
  components: { 
    WhiteboardDrawings,
  },

  data() {
    return {
      drawings: [],
      width: 1400,
      height: 600,
    }
  },

  beforeMount() {
    this.drawings = new Drawings();
    this.tool = new Pencil();
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