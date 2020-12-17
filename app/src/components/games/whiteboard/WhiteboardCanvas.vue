<template>
  <div class="whiteboard__canvas">
    <whiteboard-drawings
      :drawings="drawings"/>
      
    <whiteboard-active-layer
      :drawings="drawings"
      :tool="tool"/>
  </div>
</template>

<script>
import WhiteboardActiveLayer from '@components/games/whiteboard/WhiteboardActiveLayer'
import WhiteboardDrawings from '@components/games/whiteboard/WhiteboardDrawings'
import Drawings from '@services/whiteboard/WhiteboardDrawings'
import Pencil from '@services/whiteboard/WhiteboardPencil'

export default {
  components: { 
    WhiteboardActiveLayer,
    WhiteboardDrawings,
  },

  data() {
    return {
      drawings: []
    }
  },

  beforeMount() {
    this.drawings = new Drawings();
    this.tool = new Pencil();
  }
}
</script>

<style lang="sass">

.whiteboard__canvas
  position: relative
  height: 100%
  width: 100%
  
.whiteboard__canvas > *
  position: absolute
  height: 100%
  width: 100%

</style>