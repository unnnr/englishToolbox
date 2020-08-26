

 
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import VideoDetails from  '@components/content/video/VideoDetails';
import VideoPlayer from  '@components/content/video/VideoPlayer';
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Overlay from '@components/content/Overlay'
import Videos from '@models/Videos'
import Alert from  '@components/Alert'
import Posts from '@models/Posts';
import Pool from  '@components/Pool';


Posts.self.track(Videos)

Vue.use(vClickOutside)
Vue.config.devtools = true;

const app = new Vue({
    el: document.querySelector('main'),

    components: {
		VideoDetails,
    	VideoPlayer,
		ContextMenu,
		FilterBar,
		Overlay,
		Alert,
		Pool
    }
});
