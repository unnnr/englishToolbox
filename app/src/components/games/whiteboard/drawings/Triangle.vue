<template>
  <polygon
    class="shape"
    :points="parsedPath"
    :fill="color"/>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'black' },

    path: { type: Array, required: true }
  },

  computed: {
    parsedPath() {
      let parsed = '';

      for (let {x, y} of this.path) {
        parsed += `${x} ${y},`
      }

      return parsed.slice(0, -1);
    }
  }
}
</script>