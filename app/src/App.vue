<template>
  <div class="root" id="app">
    <cookie-popup/>
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

import vClickOutside from 'v-click-outside'
import Vue from 'vue';

import ValidationLinker from '@plugins/ValidationLinker'
import Context from '@plugins/ContextMenu'
import ToolTip from '@plugins/ToolTip'

import ProfilePopup from '@components/popups/ProfilePopup'
import CookiePopup from '@components/popups/CookiePopup'
import Basement from '@components/layout/Basement'
import Navbar from '@components/layout/Navbar'
import Alert from '@components/popups/Alert'


import bus from '@services/eventbus';

Vue.use(ValidationLinker);
Vue.use(vClickOutside);
Vue.use(Context);
Vue.use(ToolTip);

export default {
  components: {
    ProfilePopup,
    CookiePopup,
    Basement,
    Navbar,
    Alert,
  },
  
  errorCaptured() {
    bus.dispatch('alert-error');
  },
}
</script>