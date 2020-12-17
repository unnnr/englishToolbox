<template>
  <g>
    <line 
      v-for="{x1, y1, x2, y2, key} of parsed"
      :key="key"

      :x1="x1"
      :y1="y1"
      
      :x2="x2"
      :y2="y2"
      
      stroke="black"/>
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
        let value = {};
        value.key = i;

        value.x1 = x; 
        value.y1 = y;

        x -= this.path.x[i];
        y -= this.path.y[i];

        value.x2 = x; 
        value.y2 = y;
        
        parsed.push(value);
      }

      return parsed;
    },

    d() {
      if (!!!this.path)
        return '';
      
      let d = `M ${this.path.x[0]} ${this.path.y[0]}`;

      for (let i = 1; i < this.path.x.length; i++) {
        let x = this.path.x[i];
        let y = this.path.y[i];

        d += `l ${x} ${y}`;
      }

      return d;
    }
  },

  methods: {
    some(index) {
      console.log(index)
    }
  }
}
</script>