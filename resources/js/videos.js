

 
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import VideoDetails from  '@components/content/video/VideoDetails';
import VideoPlayer from  '@components/content/video/VideoPlayer';
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Overlay from '@components/Overlay'
import Pool from  '@components/Pool';
import Videos from '@models/Videos'
import Posts from '@models/Posts';


Posts.self.track(Videos)

Vue.use(vClickOutside)
Vue.config.devtools = true;

const app = new Vue({
    el: document.querySelector('main'),

    components: {
		Overlay,
		VideoDetails,
    	VideoPlayer,
		FilterBar,
		Pool,

		ContextMenu
    }
});
