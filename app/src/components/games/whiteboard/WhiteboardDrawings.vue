<template>
  <svg 
    class="whiteboard__drawings"
    viewBox="0 0 1400 600"
    xmlns="http://www.w3.org/2000/svg"
    @mousedown="onClick">

    <component
      :is="getComponent(paiting.type)"

      v-for="(paiting, index) of svg.components"
      :key="index"
      
      v-bind="paiting"
      :style="{'z-index': index}"
      
      @mousedown.native.stop="event => onClick(event, paiting)"> 
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

  data() {
    return {
      dom: {
        types: ['text'],
        components: []
      },

      svg: {
        types: ['pen', 'eraser', 'ellips', 'triangle', 'rectangle'],
        components: []
      }
    }
  },

  watch: {
    collection: {
      handler(value) {
        let svg = [];
        let dom = [];

        for (let item of value) {
          if (this.dom.types.indexOf(item.type) !== -1)
            dom.push(item);
          else
            svg.push(item);
        }
        
        this.svg.components = svg;
        this.dom.components = dom;
      },

      immediate: true
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

    onClick(event, el) {
      this.$emit('select', {el, event})
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