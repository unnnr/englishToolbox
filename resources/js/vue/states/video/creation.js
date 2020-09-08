import {appendTagsData, appendMainTagData} from '@states/video/helpers'
import Video from '@models/Videos'

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
            let post = await Video.create(data);
            
            vue.onVideoCreated(post);
        }
        catch(erorr) {
            console.log(2);
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