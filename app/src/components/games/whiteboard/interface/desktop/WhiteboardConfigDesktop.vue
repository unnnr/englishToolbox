<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes-desktop
      :disabled="sizeless"
      v-model="config.size"/>

    <whiteboard-colors-desktop
      :disabled="colorless"
      v-model="config.color"/>

    <whiteboard-tools-desktop
      v-model="config.tool"/>
  </div>
</template>

<script>
import WhiteboardColorsDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardColorsDesktop'
import WhiteboardSizesDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardSizesDesktop'
import WhiteboardToolsDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardToolsDesktop'

export default {
  components: {
    WhiteboardColorsDesktop,
    WhiteboardSizesDesktop,
    WhiteboardToolsDesktop,
  },

  inject: ['$config'],

  props: {
    sizeless: { type: Boolean, default: false },
    colorless: { type: Boolean, default: false },
  },
  
  computed: {
    config() {
      return this.$config();
    },

    tool() {
      return this.config.tool
    }
  }
}
</script>