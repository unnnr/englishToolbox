<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes/>
    <whiteboard-colors/>
    <whiteboard-tools/>
  </div>
</template>

<script>
import WhiteboardColors from '@components/games/whiteboard/interface/WhiteboardColors'
import WhiteboardSizes from '@components/games/whiteboard/interface/WhiteboardSizes'
import WhiteboardTools from '@components/games/whiteboard/interface/WhiteboardTools'

export default {
  components: {
    WhiteboardColors,
    WhiteboardSizes,
    WhiteboardTools,
  }
}
</script>