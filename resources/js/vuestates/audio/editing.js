
import {appendMainTagData} from '@states/audio/helpers'
import {appendTagsData} from '@states/audio/helpers'
import {getLabel} from '@states/audio/helpers'

import Audio from '@models/Audio'

export default function(vueInstance, post)
{
    function ref(name) 
    {
        return vue.$refs[name];
    }
    
    function init()
    {
        vue.clear();

        vue.audio.title =  post.title;
        vue.audio.description = post.description || '';
        vue.audio.audioLabel = 'new audio';
        vue.audio.imageLabel = 'new image';

        let tags = ref('tags')

        tags.clear();

        tags.selected = post.tags;

        if (!!!post.mainTag.default)
            tags.main = tags.getTagById(post.mainTag.id);
        
    }

    function getFormData()
    {
        const NULLABLE_MAIN_TAG = true;

        let data = new FormData(ref('form'));

        let tags = ref('tags').selected;
        appendTagsData(data, tags);

        let mainTag = ref('tags').mainTag;
        appendMainTagData(data, mainTag, NULLABLE_MAIN_TAG);
            
        return data;
    }

        
    this.updateAudio = () =>
    {  
       let input = ref('audio');

       vue.audio.audioLabel = getLabel(input, 'audio', 'new');
    }

    this.updateImage = () =>
    {
        let input = ref('image');

        vue.audio.imageLabel = getLabel(input, 'image', 'new');
    }

    this.submit = async () => 
    {
        let id = target.id;
        let data = getFormData();
        let post = await Audio.edit(id, data);
        
        vue.onAudioEdited(post);
    }

    this.isFieldsRequired = () =>
    {
        return false;
    }
    
    this.hadleError = () =>
    {

    }    
    
    this.getTitle= () => 
    {
        return 'Edit post';
    }
    

    const vue = vueInstance;
    const target = post;

    init();
}
