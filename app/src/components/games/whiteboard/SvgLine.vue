<template>
  <g>
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
  </g>
</template>

<script>
export default {
  props: {
    path: { type: Object, default: () => {} }
  },

  computed: {
    dotsCount() {
      return this.path.x.length - 1;
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