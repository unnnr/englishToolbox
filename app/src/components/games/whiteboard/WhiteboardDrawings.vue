<template>
  <svg 
    class="whiteboard__drawings"
    viewBox="0 0 1400 600"
    xmlns="http://www.w3.org/2000/svg">

    <component
      :is="getComponent(paiting.type)"

      v-for="(paiting, index) of collection"
      :key="index"
      
      v-bind="paiting"
      :style="{'z-index': index}"
      
      @mousedown.native="event => onClick(paiting, event)"> 
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

  inject: ['$drawings', '$config'], 

  computed: {
    drawings() {
      return this.$drawings();
    },

    collection() {
      return this.drawings.collection()
    },

    config() {
      return this.$config();
    },

    tool() {
      return this.config.tool;
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

    onClick(painting, event) {
      if (!!!this.tool || !!!this.tool.select)
        return;

      this.tool.select(painting, this.drawings);
      event.stopPropagation();
    }
  }
}
</script>

<style lang="sass">

.penline:hover
  stroke: #6666ff

.shape
  transition: fill .2s, stroke .2s

.shape:hover
  fill: #6666ffb0
  stroke: #6666ff
  stroke-width: 5px
  stroke-dasharray: 15
  stroke-linejoin: round
  
.whiteboard__drawings
  position: absolute
  left: 0
  height: 100%
  width: 100%

</style>