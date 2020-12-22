<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes
      v-model="config.size"/>

    <whiteboard-colors
      v-model="config.color"/>

    <whiteboard-tools
      v-model="config.tool"/>
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
    },

    tool() {
      return this.config.tool
    }
  },

  watch: {
    tool(value) {
      this.config.inspecting = value && value.inspecting; 
    }
  }
}
</script>