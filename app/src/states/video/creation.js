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

    function getFormData(nullable = false)
    {
        let data = ref('form').getData();

        let tags = ref('tags').selected;
        appendTagsData(data, tags, nullable);

        let mainTag = ref('tags').main;
        appendMainTagData(data, mainTag, nullable);
            
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