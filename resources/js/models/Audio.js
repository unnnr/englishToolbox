import Http from '@services/Http';

const Audio = new function ()
{
    async function init()
    {
        audioCollection = await Http.get('api/audio');

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
        let mainTagCopy = { ...audio.mainTag };

        let tagsCopy = [];
        for (let tag of audio.tags)
            tagsCopy.push({  ...tag });
    
        let audioCopy = {
            id: audio.id, 
            tags: tagsCopy,
            title: audio.title,
            mainTag: mainTagCopy,
            image: audio.image,
            audio: audio.audio,
            thumbnail: audio.thumbnail,
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
        let response = await Http.post('api/audio', data);
        if (!!!response)
            return null;

        let newVideo = {
            id: response.id,
            tags: response.tags,
            title: response.title,
            mainTag: response.mainTag,
            image: response.image,
            audio: response.audio,
            thumbnail: response.thumbnail,
            description: response.description
        };

        audioCollection.push(newVideo);
        
        return createCopy(newVideo);
    }

    this.edit = async (id, data) =>
    {
        let target = getById(id);
        
        let title = data.get('title');
        if (target.title == title)
            data.delete('title');
        
        let description = data.get('description');
        if (description === '')
            description = null;

        if (target.description == description)
            data.delete('description');

        let mainTag = data.get('mainTag');
        if (target.mainTag.default && !!!mainTag.lenght)
            data.delete('mainTag');
        if (target.mainTag.id == mainTag)
            data.delete('mainTag');

        let image = data.get('imageFile');
        if (image.size === 0)
            data.delete('imageFile');

        let audio = data.get('audioFile');
        if (audio.size === 0)
            data.delete('audioFile');

        compareDataWithTags(data, target.tags)

        if (isFormDataEmpty(data))
            return createCopy(target);

        console.log(12);
        let response = await Http.patch('api/audio/' + id, data);
        console.log(21);


        if (!!!response)
            return null; 


        target.tags = response.tags;
        target.title = response.title;
        target.mainTag = response.mainTag;
        target.audio = response.audio;
        target.image = response.image;
        target.thumbnail = response.thumbnail;
        target.description = response.description;
        
        return createCopy(target);
    }

    this.delete = async (id) =>
    {
        let response = await Http.delete('api/audio/' + id);
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
        return audio.thumbnail;
    }
    
    this.getModelLabel = () =>
    {
        return 'audio';
    }

    let isLoaded = false;
    let audioCollection = [];
    let callbackCollection = [];

    init();
}();

export default Audio;