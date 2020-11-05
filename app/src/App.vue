<template>
  <div class="root" id="app">
    <popup/>

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
import vClickOutside from 'v-click-outside'
import Context from '@plugins/ContextMenu'
import ValidationLinker from '@plugins/ValidationLinker'

import Basement from '@components/layout/Basement'
import Navbar from '@components/layout/Navbar'
import Popup from '@components/alert/Popup'

import bus from '@services/eventbus';

Vue.use(vClickOutside);
Vue.use(ValidationLinker);
Vue.use(Context);

export default {
  components: {
    Basement,
    Navbar,
    Popup
  },
  
  errorCaptured(error) {
    let options;

    if (!!!event || typeof event === 'string')
       options = { message: error };
    else
      options = error;
      
    bus.dispatch('alert-error', options)
  }
}
</script>

<style>

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


<style lang="sass">

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s !important

.fade-enter, .fade-leave-to
  opacity: 0 !important

.disable-select 
  -webkit-user-select: none  
  -moz-user-select: none  
  -ms-user-select: none      
  user-select: none


</style>