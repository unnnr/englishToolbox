<template>
  <div class="root" id="app">
    <profile-popup/>
    <context-menu/>
    <tooltip/>
    <alert/>

    <navbar/>

    <transition 
      name="temp"
      mode="out-in"
      @before-leave="freezeStyle">

      <router-view/>
    </transition>

    <basement/>
  </div>
</template>

<script>

import Vue from 'vue';
import vClickOutside from 'v-click-outside'
import ValidationLinker from '@plugins/ValidationLinker'
import Context from '@plugins/ContextMenu'
import ToolTip from '@plugins/ToolTip'

import ProfilePopup from '@components/popups/ProfilePopup.vue';
import Basement from '@components/layout/Basement'
import Navbar from '@components/layout/Navbar'
import Alert from '@components/popups/Alert'

import bus from '@services/eventbus';

Vue.use(vClickOutside);
Vue.use(ValidationLinker);
Vue.use(Context);
Vue.use(ToolTip);

export default {
  components: {
    ProfilePopup,
    Basement,
    Navbar,
    Alert,
  },
  
  errorCaptured(error) {
    let options;

    if (!!!event || typeof event === 'string')
       options = { message: error };
    else
      options = error;
      
    bus.dispatch('alert-error', options)
  },

  methods: {
    freezeStyle(el) {
      let height = el.offsetHeight + 'px';
      let width = el.offsetWidth + 'px';
			let left = el.offsetLeft + 'px';
     	let top = el.offsetTop + 'px';

      Object.assign(el.style, {
        height, width, left, top
      });
    }
  }
}
</script>

<style>

#app {
  background: #fafafa;
}

.temp-enter-active, .temp-leave-active {
  transition-duration: 400s;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 4s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
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