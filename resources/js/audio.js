
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import Audio from '@models/Audio'
import Posts from '@models/Posts';
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Pool from  '@components/Pool';
import Overlay from '@components/Overlay'
import AudioDetails from  '@components/content/audio/AudioDetails';
import AudioPlayer from  '@components/content/audio/AudioPlayer';


Posts.self.track(Audio)

Vue.config.devtools = true;
Vue.use(vClickOutside);

const app = new Vue({
    el: document.querySelector('main'),

    components: {
		Overlay,
		AudioDetails,
    	AudioPlayer,
		FilterBar,
		Pool,

		ContextMenu
    }
});
