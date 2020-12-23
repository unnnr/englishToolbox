<template>
  <polygon
    class="polygon"
    :fill="color"
    :points="points"/>
</template>

<script>
export default {
  props: {
    path: { type: Array, default: () => {} },

    color: { type: String, default: 'black' },
  },

  computed: {
    points() {
      let points = '';

      if (this.path.length === 1) { 
        let {x , y} = this.path[0];

        return `${x} ${y}, ${x} ${y}`;
      }

      for (let {x, y} of this.path)
        points += `${x} ${y},`

      return points.slice(0, -1);
    }
  }
}
</script>