
import PostModel from '@models/PostModel'; 

class Videos extends PostModel 
{ 
    path = 'videos'
    
    type = 'video'

    compareVideoUrl(newValue, cached)
    {
        let link = 'https://youtube.com/watch?v=';

        return newValue === link + cached.youtubeId;
    }
}

window.Videos = new Videos();

export default window.Videos;