<template>
  <polyline
    class="penline"
    fill="none"

    stroke-linecap="round"
    stroke-linejoin="round"

    :points="points"
    :stroke="color"
    :stroke-width="size"/>
</template>

<script>
export default {
  props: {
    path: { type: Object, default: () => {} },

    color: { type: String, default: 'black' },

    size: { type: Number, default: 1 },
  },

  computed: {
    coords() {
      if (!!!this.path || !!!Array.isArray(this.path.x) || !!!this.path.x.length)
        return [];

      let coords = [];
      let x = 0;
      let y = 0;

      for (let i = 0;  i < this.path.x.length; i++) {
        x += this.path.x[i];
        y += this.path.y[i];

        coords.push({x, y});
      }

      return coords;
    },

    points() {
      let points = '';

      if (this.coords.length === 1) { 
        let {x , y} = this.coords[0];

        return `${x} ${y}, ${x} ${y}`;
      }

      for (let {x, y} of this.coords)
        points += `${x} ${y},`

      return points.slice(0, -1);
    }
  }
}
</script>