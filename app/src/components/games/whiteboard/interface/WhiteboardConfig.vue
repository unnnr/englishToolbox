<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes
      :disabled="sizeless"
      v-model="config.size"/>

    <whiteboard-colors
      :disabled="colorless"
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

  data() {
    return {
      sizeless: false,
      colorless: false
    }
  },

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
      if (!!!value)
        return;

      this.config.inspecting = value.inspecting; 
      this.colorless = value.colorless;
      this.sizeless = value.sizeless;
    }
  }
}
</script>