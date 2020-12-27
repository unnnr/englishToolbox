<template>
  <whiteboard-controls-mobile 
    v-if="mobile"/>

  <whiteboard-controls-desktop
    v-else/>
</template>

<script>
import WhiteboardControlsDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardControlsDesktop'
import WhiteboardControlsMobile from '@components/games/whiteboard/interface/mobile/WhiteboardControlsMobile'


export default {
  components: {
    WhiteboardControlsDesktop,
    WhiteboardControlsMobile,
  },

  inject: ['$mobile'],

  computed: {
    mobile() {
      return this.$mobile();
    },
  }
}
</script>