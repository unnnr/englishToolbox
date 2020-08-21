/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 
import Vue from 'vue';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import vClickOutside from 'v-click-outside'
import VideoDetails from  '@components/content/video/VideoDetails';
import VideoPlayer from  '@components/content/video/VideoPlayer';
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Pool from  '@components/Pool';

Vue.use(vClickOutside)
Vue.config.devtools = true;

const app = new Vue({
    el: document.querySelector('main'),

    components: {
		VideoDetails,
    	VideoPlayer,
		FilterBar,
		Pool,

		ContextMenu
    }
});
