import Http from '@services/Http';

const Audio = new function ()
{
    async function init()
    {
        audioCollection = await Http.get('audio')

        if (!!!Array.isArray(audioCollection))
            console.error('500 error');

        isLoaded = true;

        for (const callback of callbackCollection)
            callback();
    }

    function getById(id)
    {
        for (const audio of audioCollection)
        {
            if (audio.id == id)
                return audio;
        }
    }

    function createCopy(audio)
    {
        let mainTagCopy = {...audio.mainTag};

        let tagsCopy = [];
        for (let tag of audio.tags)
            tagsCopy.push({  ...tag });
    
        let audioCopy = {
            id: audio.id, 
            tags: tagsCopy,
            title: audio.title,
            mainTag: mainTagCopy,
            imageUrl: audio.imageUrl,
            audioUrl: audio.audioUrl,
            description: audio.description
        };

        return audioCopy;
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
        let response = await Http.post('audio', data);
        if (!!!response)
            return null;

        console.log(response);
        let newvideo = {
            id: response.id,
            tags: response.tags,
            title: response.title,
            mainTag: response.mainTag,
            imageUrl: response.thumbnailUrl,
            audioUrl: response.audioUrl,
            description: response.description
        };


        console.log(response.thumbnailUrl);

        audioCollection.push(newvideo);
        
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
        let response = await Http.delete('audio/' + id);
        if (!!!response)
            return null;
            
        return response;
    } 

    this.get = (id) =>
    {
        let audio = getById(id);

        return createCopy(audio);
    }

    this.all = () =>
    {
        let audioCopy = [];
        
        for (let audio of audioCollection)
           audioCopy.push(createCopy(audio));

        return [ ...audioCopy ];
    }

    this.onload = (callback) =>
    {
        if (isLoaded)
            return callback();
        
        callbackCollection.push(callback);
    }    

    this.createThumbnail = (audio) =>
    {
        return audio.imageUrl;
    } 

    let isLoaded = false;
    let audioCollection = [];
    let callbackCollection = [];

    init();
}();

export default Audio;