<template>
  <canvas 
    v-show="active"
    ref="canvas"
    class="whiteboard__canvas"
    :height="height"
    :width="width"/>
</template>

<script>
export default {
  inject: ['$config', '$drawings'],

  props: {
    active: { type: Boolean, default: false }
  },

  data() {
    return {
      context: null
    }
  },

  computed: {
    config() {
      return this.$config();
    },

    drawings() {
      return this.$drawings();
    },

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
    active(value) {
      if (!!!value)
        this.clear();
    }
  },

  mounted() {
    this.context = this.createContext();
  },

  methods: {
    createContext() {
      let canvas = this.$refs.canvas;
      return canvas ? canvas.getContext("2d") : null;
    },

    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  }
}
</script>

<style lang="sass">

.whiteboard__canvas
  position: relative
  width: 100%
  
</style>