import Http from '@services/Http';
import getYouTubeID from 'get-youtube-id';

const Videos = new function ()
{
    async function init()
    {
        videos = await Http.get('video')

        if (!!!Array.isArray(videos))
            console.error('500 error');

        isLoaded = true;

        for (const callback of callbackCollection)
            callback();
    }

    function getById(id)
    {
        for (const video of videos)
        {
            if (video.id == id)
                return video;
        }
    }

    function createCopy(video)
    {
        let tagsCopy = [];
            
        for (let tag of video.tags)
            tagsCopy.push({  ...tag });
        
        let videoCopy= {
            index: video.id - 1,
            id: video.id, 
            title: video.title,
            videoID: video.videoID,
            description: video.description,
            mainTag: {...video.mainTag},
            tags: tagsCopy
        };

        return videoCopy;
    }

    function isFormDataEmpty(data)
    {
        if (data.values().next())
            return false;

        return true;
    }

    function compareDataWithTags(data, tags)
    {
        for (const index in tags)
        {
            let tag =  tags[index];
            
            if (tag.id !== data.get(`tags[${index}]`))
                return;
        }

        for (const index in tags)
            data.delete(`tags[${index}]`);
    }

    this.create = async (data) =>
    {
        let response = await Http.post('video', data);
        if (!!!response)
            return null;

        let newvideo = {
            id: response.id,
            tags: response.tags,
            title: response.title,
            mainTag: response.mainTag,
            videoID: response.videoID,
            description: response.description
        };

        videos.push(newvideo);
        
        return createCopy(newvideo);
    }

    this.edit = async (id, data) =>
    {
        let target = getById(id);
        
        let videoID = getYouTubeID(String(data.get('videoUrl')));
        if (target.videoID === videoID)
            data.delete('videoUrl');
        
        let description = data.get('description');
        if (target.description === description)
            data.delete('description');

        let mainTag = data.get('mainTag');
        if (target.mainTag.id == mainTag)
            data.delete('mainTag');

        compareDataWithTags(data, target.tags)

        if (isFormDataEmpty(data))
            return createCopy(target);

        let response = await Http.patch('video/' + id, data);
        if (!!!response)
            return null; 

        target.tags = response.tags,
        target.title = response.title,
        target.mainTag = response.mainTag,
        target.videoID = response.videoID,
        target.description = response.description

        return createCopy(target);
    }

    this.delete = async (id) =>
    {
        let response = await Http.delete('video/' + id);
        if (!!!response)
            return null;
            
        return response;
    } 

    this.get = (id) =>
    {
        let video = getById(id)

        return createCopy(video);
    }

    this.all = () =>
    {
        let videosCopy = [];
        
        for (let video of videos)
           videosCopy.push(createCopy(video));

        return [ ...videosCopy ];
    }

    this.onload = (callback) =>
    {
        if (isLoaded)
            return callback();
        
        callbackCollection.push(callback);
    }   

    this.createThumbnail = (video) =>
    {
        return `https://i.ytimg.com/vi/${video.videoID}/sddefault.jpg`;
    } 

    let videos = [];
    let isLoaded = false;
    let callbackCollection = [];

    init();
}();

export default Videos;