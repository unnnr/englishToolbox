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

export default {
  components: {
    WhiteboardColors,
    WhiteboardSizes,
    WhiteboardTools,
  },

  inject: ['$config'],

  computed: {
    config() {
      return this.$config();
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
      console.log('new tool', tool);

      this.config.inspecting = 
        tool && (tool.type === 'inspector');

      this.config.tool = tool;
    },
  }
}
</script>