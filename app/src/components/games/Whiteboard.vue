<template>
  <whiteboard-editor v-if="admin"/>
  <whiteboard-presentor v-else/>
</template>

<script>
import DrawingsCollection from '@services/whiteboard/Drawings'
import Config from '@services/whiteboard/Config'
import Auth from '@services/Auth';

import WhiteboardEventsGrip from '@components/games/whiteboard/WhiteboardPresentor'
import WhiteboardEditor from '@components/games/whiteboard/WhiteboardEditor'
import WhiteboardPresentor from './whiteboard/WhiteboardPresentor.vue';


export default {
  components: {
    WhiteboardPresentor,
    WhiteboardEditor
  },


  provide() {
    const _this = this;

    return {
      $drawings: () => _this.drawings,

      $config: () => _this.config
    }
  },

  data() {
    return {
      drawings: new DrawingsCollection,
      config: new Config(),

      admin: false,
    }
  },


  beforeMount() {
    Auth.user.get().then(user => 
      this.admin = user && user.admin);
	},
}
</script>

<style lang="sass">

.whiteboard__element
  transition: opacity .3s

.whiteboard--painting .whiteboard__element, 
.whiteboard__element--disabled
  opacity: .5

</style>