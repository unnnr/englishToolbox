<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1400 600">

    <component
      :is="getComponent(paiting.type)"

      v-for="(paiting, index) of collection"
      :key="index"
      
      v-bind="paiting"
      @click.native="hover"> 
    </component>
    
  </svg>
</template>

<script>
import Rectangle from '@components/games/whiteboard/drawings/Rectangle'
import Triangle from '@components/games/whiteboard/drawings/Triangle'
import Ellipse from '@components/games/whiteboard/drawings/Ellipse'
import PenLine from '@components/games/whiteboard/drawings/Penline'
import Eraser from '@components/games/whiteboard/drawings/Eraser'

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
        case 'pen': return PenLine
        case 'eraser': return Eraser
        case 'ellipse': return Ellipse
        case 'triangle': return Triangle
        case 'rectangle': return Rectangle
        default: return 'path';
      }
    },

    hover(some) {
      console.log(123);
    }
  }
}
</script>

<style lang="sass">

svg > *:hover
  fill: none
  stroke: #646464
  stroke-width: 1px
  stroke-dasharray: 2,2
  stroke-linejoin: round


</style>