<template>
  <ellipse
    class="shape"
    
    :cx="x"
    :cy="y" 

    :rx="radiusX"
    :ry="radiusY" 
    
    :fill="color"/>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'black' },

    radiusX: { type: Number, required: true  },

    radiusY: { type: Number, required: true  },

    x: { type: Number, required: true  },

    y: { type: Number, required: true  },
  }
}
</script>