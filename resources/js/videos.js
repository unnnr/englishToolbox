import VideoDetails from  '@pages/video/VideoDetails'
import VideoPlayer from  '@pages/video/VideoPlayer'
import FilterBar from '@components/posts/FilterBar'
import Overlay from '@components/posts/Overlay'
import Pool from  '@components/cards/Pool'

import Videos from '@models/Videos'
import Posts from '@models/Posts'

import App from '@root/App';


Posts.self.track(Videos);

App.withDevtools();

App.components({
	VideoDetails,
    VideoPlayer,
	FilterBar,
	Overlay,
	Pool
});

App.boot();