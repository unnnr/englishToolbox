<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1400 600">

    <component
      v-for="(paint, index) of collection"
      :key="index"
      :is="getComponent(paint)"
      
      :path="paint.path"> 
    </component>
    
  </svg>
</template>

<script>
import SvgLine from '@components/games/whiteboard/SvgLine'

export default {
  components: {
    SvgLine
  },

  props: {
    drawings: { type: Object, required: true }
  },

  data() {
    return {
      key: 0
    }
  },

  computed: {
    collection() {
      return this.drawings.collection
    }
  },

  methods: {
    getComponent(pen) {
      if (pen.type == 'pen')
        return SvgLine;

      return 'path';
    }
  }
}
</script>