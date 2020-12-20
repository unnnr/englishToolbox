<template>
  <canvas 
    ref="canvas"
    class="whiteboard__canvas"
    :height="height"
    :width="width"/>
</template>

<script>
export default {
  inject: ['$config', '$drawings'],

  computed: {
    config() {
      return this.$config();
    },

    drawings() {
      return this.$drawings();
    },
  },

  computed: {
    tool() {
      return this.config.tool;
    },

    width() {
      return this.config.width;
    },

    height() {
      return this.config.height;
    },
  },
  
  watch: {
    config(value) {
      value.canvas = this.$el
    } 
  },

  mounted() {
    this.config.canvas = this.$el
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
  
</style>