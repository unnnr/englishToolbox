<template>
  <textarea/> 
</template>

<script>
export default {
  props: {
    value: ''
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