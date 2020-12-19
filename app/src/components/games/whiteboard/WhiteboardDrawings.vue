<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1400 600">

    <component
      :is="getComponent(paiting.type)"

      v-for="(paiting, index) of collection"
      :key="index"
      
      v-bind="paiting"> 
    </component>
    
  </svg>
</template>

<script>
import Rectangle from '@components/games/whiteboard/drawings/Rectangle'
import Ellipse from '@components/games/whiteboard/drawings/Ellipse'
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

        case 'rectangle': 
          return Rectangle

        case 'ellipse': 
          return Ellipse
      }

      return 'path';
    }
  }
}
</script>