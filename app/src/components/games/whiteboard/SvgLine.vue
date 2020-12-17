<template>
 <!--  <g>
    <line 
      v-for="{x1, y1, x2, y2, key} of parsed"
      :key="key"

      :x1="x1"
      :y1="y1"
      
      :x2="x2"
      :y2="y2"
      
      stroke-width="15"
      stroke="black"
      stroke-linecap="round"/>
  </g> -->

  <polyline
    :points="points"
    fill="none"
    stroke="black"
    stroke-width="15"
    stroke-linecap="round"
    stroke-linejoin="round"/>


</template>

<script>
export default {
  props: {
    path: { type: Object, default: () => {} }
  },

  computed: {
    coords() {
      if (!!!this.path || !!!Array.isArray(this.path.x) || !!!this.path.x.length)
        return [];

      let coords = [];
      let x = 0;
      let y = 0;

      for (let i = 0;  i < this.path.x.length; i++) {
        console.log(x, this.path.x[i])


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
    },

    parsed() {
      if (!!!this.path || !!!this.path.x || !!!this.path.x.length)
        return [];

      let parsed = [];
      let x = this.path.x[0];
      let y = this.path.y[0];

      for (let i = 1; i < this.path.x.length; i++) {
        let value = {
          key: i,

          x1: x, y1: y,

          x2: x -= this.path.x[i],
          y2: y -= this.path.y[i]
        };
  
        parsed.push(value);
      }

      return parsed;
    }
  },

  methods: {
    some(index) {
      console.log(index)
    }
  }
}
</script>