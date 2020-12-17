<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1400 600">

    <component
      :is="getComponent(type)"

      v-for="({type, color, size, path}, index) of collection"
      :key="index"

      :color="color"
      :size=size
      :path="path"> 
    </component>
    
  </svg>
</template>

<script>
import PenLine from '@components/games/whiteboard/drawings/Penline'

export default {
  components: {
    PenLine
  },

  props: {
    drawings: { type: Object, required: true }
  },
  
  computed: {
    collection() {
      return this.drawings.collection
    }
  },

  methods: {
    getComponent(type) {
      switch (type) {
        case 'pen': 
          return PenLine
      }

      return 'path';
    }
  }
}
</script>