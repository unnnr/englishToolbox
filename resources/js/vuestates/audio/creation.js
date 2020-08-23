
import {getLabel, appendTagsData, appendMainTagData} from '@states/audio/helpers'
import Audio from '@models/Audio'



export default function(vueInstance)
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

    this.isFieldsRequired = () =>
    {
        return true;
    }
    
    this.hadleError = () =>
    {

    }
    
    const vue = vueInstance;

    init();
} 