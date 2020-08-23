
import Audio from '@models/Audio'


// Help functions

function getLabel(input, label, prefix = '')
{
    if (!!!input.files.length)
        return prefix + label;

    let fileName = input.files[0].name;

    return fileName;
}


function appendTagsData(data, tags)
{
    for (const [index, tag] of tags.entries())
        data.append(`tags[${index}]`, tag.id);
}

function appendMainTagData(data,mainTag, nullable = false)
{ 
    if (mainTag) data.append('mainTag', mainTag.id);
    else if(nullable) data.append('mainTag', '');
}


// States

export function editorState(vueInstance)
{

    function init()
    {

    }

    this.getFormData = () =>
    {
        
    }

    this.setAudioLabel = () =>
    {  
        this.createLabel(vue, 'audio');
    }

    this.setImageLabel = () =>
    {

    }

    this.submit = () => 
    {

    }

    this.hadleError = () =>
    {

    }

    const vue = vueInstance;

    init();
}



export function creatorState(vueInstance)
{
    function ref(name) 
    {
        return vue.$refs[name];
    }


    function init()
    {
        vue.clear();

        vue.audio.audioLabel = 'audio';
        vue.audio.imageLabel = 'image';

        ref('tags').clear();
    }

    function getFormData()
    {
        let data = new FormData(ref('form'));

        let tags = ref('tags').selected;
        appendTagsData(data, tags);

        let mainTag = ref('tags').mainTag;
        appendMainTagData(data, mainTag);
            
        return data;
    }

    this.updateAudio = () =>
    {  
       let input = ref('audio');

       vue.audio.audioLabel = getLabel(input, 'audio');
    }

    this.updateImage = () =>
    {
        let input = ref('image');

        vue.audio.imageLabel = getLabel(input, 'image');
    }

    this.submit = async() => 
    {
        let data = getFormData();
        let post = await Audio.create(data);

        vue.onAudioCreated(post);
    }

    this.hadleError = () =>
    {

    }
    
    const vue = vueInstance;

    init();
} 