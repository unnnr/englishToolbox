<template>
  <div id="app">
    <alert/>

    <context-menu/>

    <navbar/>
    
    <router-view/>

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

Vue.use(vClickOutside);
Vue.use(Context);

export default {
  components: {
    Basement,
    Navbar,
    Alert
  }
}
</script>

