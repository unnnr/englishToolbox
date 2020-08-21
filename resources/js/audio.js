// Importing Vue core
import Vue from 'vue';

// Importing plugins
import vClickOutside from 'v-click-outside'

// Importing models
import Audio from '@models/Videos'
import Posts from '@models/Posts';

// Importing  static components
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Pool from  '@components/Pool';

// Importing dynamic components
import AudioDetails from  '@components/content/audio/AudioDetails';
import AudioPlayer from  '@components/content/audio/AudioPlayer';


Posts.self.track(Audio)

Vue.config.devtools = true;
Vue.use(vClickOutside);

const app = new Vue({
    el: document.querySelector('main'),

    components: {
		AudioDetails,
    	AudioPlayer,
		FilterBar,
		Pool,

		ContextMenu
    }
});
