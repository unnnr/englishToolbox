
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
        try { 
            let data = getFormData();
            let post = await Audio.create(data);

            vue.onAudioCreated(post);
        }
        catch(erorr) {
            this.hadleError(erorr);
        }

    }

    this.isFieldsRequired = () =>
    {
        return true;
    }
    
    this.hadleError = (error) =>
    {
        if (error.status === 500)
        {
            vue.onServerError();
            return;
        }

        if (error.status === 422)
        {
            let errors = error.body.errors;
            
            if (errors.title)
                vue.errors.title += errors.title.join('. ');
        
            if (errors.description)
                vue.errors.description += errors.description.join('. ');

            if (errors.audioFile)
                vue.errors.files += errors.audioFile.join('. ');
            
            if (errors.audioFile && errors.imageFile)
                vue.errors.files += ' ';

            if (errors.imageFile)
                vue.errors.files += errors.imageFile.join('. ');
        }
    }

    this.getTitle = () => 
    {
        return 'New audio';
    }
    
    const vue = vueInstance;

    init();
} 