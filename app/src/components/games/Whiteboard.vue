<template>
  <transition name="fade">
    <whiteboard-editor v-if="canEdit"/>
    <whiteboard-presentor v-else/>
  </transition>
</template>

<script>
import DrawingsCollection from '@services/whiteboard/Drawings'
import Resolution from '@services/Resolution'
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

      $config: () => _this.config,

      $locked: () => _this.locked,

      $admin: () => _this.admin,

      $mobile: () => _this.mobile
    }
  },

  data() {
    return {
      drawings: new DrawingsCollection,
      config: new Config(),

      locked: false,
      admin: false,
      banned: false,
      mobile: false,
    }
  },

  computed: {
    canEdit() {
      return this.admin || (!!!this.banned && !!!this.locked)
    }
  },

  beforeMount() {
    Auth.user.get().then(user => {
      this.banned = user && user.banned;
      this.admin = user && user.admin;
    });

		Resolution.bind(type => 
      this.mobile = Resolution.DESKTOP !== type);

    let handler = this.drawings._collection;

    handler.whenLocked = 
      () => this.locked = true;

    handler.whenUnlocked = 
      () => this.locked = false; 

    this.locked = handler.locked;

  },
}
</script>

<style lang="sass">

.whiteboard__element
  transition: opacity .3s

.whiteboard--painting .whiteboard__element, 
.whiteboard--painting .whiteboard__element-mobile,
.whiteboard__element--disabled
  opacity: .5

</style>