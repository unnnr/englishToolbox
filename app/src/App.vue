<template>
  <div class="root" id="app">
    <profile-popup/>
    <context-menu/>
    <tooltip/>
    <alert/>

    <navbar/>

    <transition 
      name="slide-right"
      mode="out-in">

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
}
</script>
