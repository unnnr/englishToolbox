
import Vue from 'vue';

import vClickOutside from 'v-click-outside'
import AudioDetails from  '@components/content/audio/AudioDetails';
import AudioPlayer from  '@components/content/audio/AudioPlayer';
import ContextMenu from '@components/ContextMenu'
import FilterBar from '@components/content/FilterBar'
import Overlay from '@components/content/Overlay'
import Audio from '@models/Audio'
import Posts from '@models/Posts';
import Modal from '@components/Modal';
import Pool from  '@components/Pool';


Posts.self.track(Audio)

Vue.config.devtools = true;
Vue.use(vClickOutside);

const app = new Vue({
    el: document.querySelector('main'),

    components: {
    	AudioPlayer,
		AudioDetails,
		ContextMenu,
		FilterBar,
		Overlay,
		Modal,
		Pool
    }
});
