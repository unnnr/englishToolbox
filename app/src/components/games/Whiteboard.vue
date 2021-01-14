<template>
  <whiteboard-prescreen
    v-if="!!!started"
    @start="start"/>

  <whiteboard-editor 
    v-else-if="canEdit"/>

  <whiteboard-presentor 
    v-else/>
</template>

<script>
import DrawingsCollection from '@services/whiteboard/Drawings'
import Resolution from '@services/Resolution'
import Shortcuts from '@services/whiteboard/Shortcuts';
import Config from '@services/whiteboard/Config'
import Auth from '@services/Auth';

import WhiteboardPresentor from '@components/games/whiteboard/WhiteboardPresentor'
import WhiteboardPrescreen from '@components/games/whiteboard/WhiteboardPrescreen'
import WhiteboardEditor from '@components/games/whiteboard/WhiteboardEditor'


export default {
  components: {
    WhiteboardPrescreen,
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

      started: false
    }
  },

  computed: {
    canEdit() {
      return this.admin || (!!!this.banned && !!!this.locked)
    }
  },

  beforeDestroy() {
    Shortcuts.unbind();
  },

  beforeMount() {
    Auth.user.get().then(user => {
      this.banned = user && user.banned;
      this.admin = user && user.admin;
    });
  },

  methods: {
    start() {
      Resolution.bind(type => 
        this.mobile = Resolution.DESKTOP !== type);

      Shortcuts.bind();

      let handler = this.drawings._collection;
      handler.whenLocked = 
        () => this.locked = true;
      handler.whenUnlocked = 
        () => this.locked = false; 

      this.locked = handler.locked;
      this.started = true;
    }
  }
}
</script>

<style lang="sass">

.whiteboard__element,
.whiteboard__element-mobile,
.whiteboard__group-inner-mobile
  opacity: 1
  transition: opacity .3s

.whiteboard--painting .whiteboard__element, 
.whiteboard--painting .whiteboard__element-mobile,
.whiteboard--painting .whiteboard__element-dropup-mobile,
.whiteboard__element--disabled
  opacity: .5



.whiteboard__user--banned .whiteboard__user-avatar:before
  content: "block"
  cursor: pointer
  opacity: 1

.whiteboard__user--persistent .whiteboard__user-avatar:before
  cursor: default !important
  opacity: 0 !important
</style>