<template>
  <div id="app">
    <alert/>

    <context-menu/>

    <navbar/>
    
    <transition name="slide-right" mode="out-in">
      <router-view/>
    </transition>

    <basement/>
  </div>
</template>

<script>

import Vue from 'vue';
import Context from '@plugins/ContextMenu'
import vClickOutside from 'v-click-outside'

import Basement from '@components/Basement'
import Navbar from '@components/Navbar'
import Alert from '@components/Alert'

import bus from '@services/eventbus';

Vue.use(vClickOutside);
Vue.use(Context);

export default {
  components: {
    Basement,
    Navbar,
    Alert
  },
  
  errorCaptured(error) {
    bus.dispatch('alert-error', error)
  }
}
</script>

<style scoped>
#app {
  background: #fafafa;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.4s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>

