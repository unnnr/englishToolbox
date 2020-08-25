
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

        let mainTag = ref('tags').mainTag;
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
        let post = await Posts.create(data);

        vue.onVideoCreated(post);
    }
        
    this.hadleError = () =>
    {

    }
    
    const vue = vueInstance;

    init();
} 