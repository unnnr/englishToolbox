<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes/>
    <whiteboard-colors/>
    <whiteboard-tools/>
  </div>
</template>

<script>
import WhiteboardColors from '@components/games/whiteboard/WhiteboardColors'
import WhiteboardSizes from '@components/games/whiteboard/WhiteboardSizes'
import WhiteboardTools from '@components/games/whiteboard/WhiteboardTools'

export default {
  components: {
    WhiteboardColors,
    WhiteboardSizes,
    WhiteboardTools,
  },

  data() {
    return {
      disabled: true
    }
  }
}
</script>