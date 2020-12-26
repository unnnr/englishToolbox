<template>
  <whiteboard-config-mobile 
    v-if="mobile"
    :colorless="colorless"
    :sizeless="sizeless"/>

  <whiteboard-config-desktop
    v-else
    :colorless="colorless"
    :sizeless="sizeless"/>
</template>

<script>
import WhiteboardConfigDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardConfigDesktop'
import WhiteboardConfigMobile from '@components/games/whiteboard/interface/mobile/WhiteboardConfigMobile'


export default {
  components: {
    WhiteboardConfigDesktop,
    WhiteboardConfigMobile,
  },

  inject: ['$mobile', '$config'],

  computed: {
    mobile() {
      return this.$mobile();
    },

    config() {
      return this.$config();
    },

    tool() {
      return this.config.tool
    }
  },

  data() {
    return {
      colorless: false,
      sizeless: false
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