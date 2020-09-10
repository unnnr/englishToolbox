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
        let data = ref('form').data;

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
        let data = getFormData();
        let post = await Video.create(data);
        
        vue.onVideoCreated(post);
    }
    
    const vue = vueInstance;

    init();
} 