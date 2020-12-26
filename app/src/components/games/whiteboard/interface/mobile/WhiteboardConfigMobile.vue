<template>
  <div class="whiteboard__group whiteboard__group--tools">
    <whiteboard-sizes-mobile
      :disabled="sizeless"
      v-model="config.size"/>

    <whiteboard-colors-mobile
      :disabled="colorless"
      v-model="config.color"/>

    <whiteboard-tools-mobile
      v-model="config.tool"/>
  </div>
</template>

<script>
import WhiteboardColorsMobile from '@components/games/whiteboard/interface/mobile/WhiteboardColorsMobile'
import WhiteboardSizesMobile from '@components/games/whiteboard/interface/mobile/WhiteboardSizesMobile'
import WhiteboardToolsMobile from '@components/games/whiteboard/interface/mobile/WhiteboardToolsMobile'

export default {
  components: {
    WhiteboardColorsMobile,
    WhiteboardSizesMobile,
    WhiteboardToolsMobile,
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