<template>
  <rect
    class="shape"

    :height="parsedHeight"
    :width="parsedWidth"

    :y="parsedY"
    :x="parsedX"
    
    :fill="color"/>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'black' },

    height: { type: Number, required: true },

    width: { type: Number, required: true  },

    x: { type: Number, required: true  },

    y: { type: Number, required: true  },
  },

  computed: {
    parsedX() {
      return this.width < 0 ? this.x + this.width : this.x;
    },

    parsedY() {
      return this.height < 0 ? this.y + this.height : this.y;
    },

    parsedWidth() {
      return Math.abs(this.width)
    },

    parsedHeight() {
      return Math.abs(this.height)
    }

  }
}
</script>