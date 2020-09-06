import AudioDetails from  '@pages/audio/AudioDetails'
import AudioPlayer from  '@pages/audio/AudioPlayer'
import FilterBar from '@components/posts/FilterBar'
import Overlay from '@components/posts/Overlay'
import Audio from '@models/Audio'

import Posts from '@models/Posts'
import Pool from  '@components/cards/Pool'

import App from '@root/App'


Posts.self.track(Audio);

App.withDevtools();

App.components({
	AudioDetails,
    AudioPlayer,
	FilterBar,
	Overlay,
	Pool
});

App.boot();