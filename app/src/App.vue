<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    
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

import Basement from '@components/Basement'
import Navbar from '@components/Navbar'
import Alert from '@components/Alert'

Vue.use(Context);

export default {
  components: {
    Basement,
    Navbar,
    Alert
  }
}
</script>