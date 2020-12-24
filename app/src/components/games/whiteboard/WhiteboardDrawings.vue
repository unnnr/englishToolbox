<template>
  <div 
    class="whiteboard__drawings">

    <svg 
      class="whiteboard__drawings-collection"
      viewBox="0 0 1400 600"
      xmlns="http://www.w3.org/2000/svg"
      @mousedown="onClick">

      <component
        :is="getComponent(painting)"

        v-for="painting of collection"
        :key="painting.id"
        
        v-bind="painting.body"
        :style="{'z-index': painting.id}"
        
        @mousedown.native.stop="event => onClick(event, painting)"> 
      </component>
      
    </svg>
  </div>
</template>

<script>
import Rectangle from '@components/games/whiteboard/drawings/Rectangle'
import Triangle from '@components/games/whiteboard/drawings/Triangle'
import Polygon from '@components/games/whiteboard/drawings/Polygon'
import Ellipse from '@components/games/whiteboard/drawings/Ellipse'
import PenLine from '@components/games/whiteboard/drawings/Penline'
import Eraser from '@components/games/whiteboard/drawings/Eraser'
import Text from '@components/games/whiteboard/drawings/Text'


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
    },

    pending() {
      return this.drawings.pending;
    }
  },

  methods: {
    onClick(event, el) {
      this.$emit('select', {el, event})
    },

    getComponent(el) {
      let type = el.body.type;

      switch (type) {
        case 'text': return Text;
        case 'eraser': return Eraser;
        case 'pencil': return PenLine;
        case 'polygon': return Polygon;
        case 'ellipse': return Ellipse;
        case 'triangle': return Triangle;
        case 'rectangle': return Rectangle;

        default: return 'path';
      }
    }
  }
}
</script>

<style lang="sass">

.shape
  transition: fill .2s, stroke .2s

.inspecting .shape:hover
  fill: #6666ffb0
  stroke: #6666ff
  stroke-width: 5px
  stroke-dasharray: 15
  stroke-linejoin: round
  
.inspecting  .penline:hover
  stroke: #6666ff

.whiteboard__drawings
  position: absolute
  left: 0
  height: 100%
  width: 100%

.whiteboard__drawings-collection
  height: 100%
  width: 100%



.whiteboard__drawings-collection text
  font-family: 'Montserrat', sans-serif
  color: #120099
  height: 100%
  width: 100%

</style>