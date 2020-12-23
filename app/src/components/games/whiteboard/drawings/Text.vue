<template>
  <text 
    :x="x" 
    :y="y"
    :fill="color"
    :style="{'font-size': fontSize}">
    
    {{ value }}
  </text>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'black'},
    
    value: { type: String, default: '' },

    size: { type: Number, default: 6},

    x: { type: Number, default: 0 },

    y: { type: Number, default: 0 },
  },

  computed: {
    fontSize() {
      return this.size + 'px';
    }
  }
}
</script>