
import {appendMainTagData} from '@states/audio/helpers'
import {appendTagsData} from '@states/audio/helpers'

import Posts from '@models/Posts'

export default function(vueInstance, post)
{
    function ref(name) 
    {
        return vue.$refs[name];
    }
    
    function init()
    {
        vue.clear();

        vue.url = 'https://youtube.com/watch?v=' + target.videoID;
        vue.description = target.description || '';


        let tags = ref('tags')
        tags.clear();
        tags.selected = target.tags;

        if (!!!target.mainTag.default)
            tags.main = tags.getTagById(target.mainTag.id);
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

    this.getTitle= () => 
    {
        return 'Edit video';
    }

    this.submit = async () => 
    {
        try { 
            let id = target.id;
            let data = getFormData();
            let post = await Posts.edit(id, data);
            
            vue.onVideoEdited(post);
        }
        catch(erorr) {
            this.hadleError(erorr);
        }
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
            
            if (errors.videoUrl)
                vue.urlError += errors.videoUrl.join('. ');
    
            if (errors.description)
                vue.descriptionError += errors.description.join('. ');
        }
    } 
  
    const vue = vueInstance;
    const target = post;

    init();
}
