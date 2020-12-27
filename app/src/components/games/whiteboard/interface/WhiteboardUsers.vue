<template>
  <whiteboard-users-mobile 
    v-if="mobile"/>

  <whiteboard-users-desktop
    v-else/>
</template>

<script>
import WhiteboardUsersDesktop from '@components/games/whiteboard/interface/desktop/WhiteboardUsersDesktop'
import WhiteboardUsersMobile from '@components/games/whiteboard/interface/mobile/WhiteboardUsersMobile'


export default {
  components: {
    WhiteboardUsersDesktop,
    WhiteboardUsersMobile,
  },

  inject: ['$mobile'],

  computed: {
    mobile() {
      return this.$mobile();
    },
  }
}
</script>