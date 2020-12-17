<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes
      @change="setSize"/>

    <whiteboard-colors
      @change="setColor"/>

    <whiteboard-tools
      @change="setTool"/>
  </div>
</template>

<script>
import WhiteboardColors from '@components/games/whiteboard/interface/WhiteboardColors'
import WhiteboardSizes from '@components/games/whiteboard/interface/WhiteboardSizes'
import WhiteboardTools from '@components/games/whiteboard/interface/WhiteboardTools'

import Pencil from '@services/whiteboard/WhiteboardPencil'

export default {
  components: {
    WhiteboardColors,
    WhiteboardSizes,
    WhiteboardTools,
  },

  data() {
    return {
      config: {
        size: 0,
        color: 'black',
        tool: null
      }
    }
  },

  methods: {
    setColor(color) {
      this.config.color = color;
    },

    setSize(size) {
      this.config.size = size;
    },

    setTool(tool) {
      this.config.tool = tool;
    },
  }
}
</script>