<template>
  <text 
    :x="x" 
    :y="y">
    
    {{ value }}
  </text>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    
    x: { type: Number, default: 0 },

    y: { type: Number, default: 0 },
  }
}
</script>