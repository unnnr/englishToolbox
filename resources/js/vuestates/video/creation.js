
import {appendTagsData, appendMainTagData} from '@states/video/helpers'
import Posts from '@models/Posts'



export default function(vueInstance)
{
    function ref(name) 
    {
        return vue.$refs[name];
    }

    function init()
    {
        vue.clear();
        ref('tags').clear();
    }

    function getFormData()
    {
        let data = new FormData(ref('form'));

        let tags = ref('tags').selected;
        appendTagsData(data, tags);

        let mainTag = ref('tags').main;
        appendMainTagData(data, mainTag);
            
        return data;
    }

    this.getTitle = () => 
    {
        return 'New audio';
    }

    this.submit = async() => 
    {
        try { 
            let data = getFormData();
            let post = await Posts.create(data);
            
            vue.onVideoCreated(post);
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

    init();
} 