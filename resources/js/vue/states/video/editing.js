
import {appendMainTagData} from '@states/video/helpers'
import {appendTagsData} from '@states/video/helpers'

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

        let tags = ref('tags');
        tags.clear();
        tags.selected = target.tags;

        if (!!!target.mainTag.default)
            tags.main = tags.getTagById(target.mainTag.id);
    }

    function getFormData()
    {
        const NULLABLE = true;

        let data = new ref('form').getData();

        let tags = ref('tags').selected;
        appendTagsData(data, tags, NULLABLE);

        let mainTag = ref('tags').main;
        appendMainTagData(data, mainTag, NULLABLE);
           
        return data;
    }

    this.getTitle= () => 
    {
        return 'Edit video';
    }

    this.submit = async () => 
    {
        console.log('here 12213 ');
        let id = target.id;
        let data = getFormData();
        
        let post = await Posts.edit(id, data);
            
        vue.onVideoEdited(post);
    }
  
    const vue = vueInstance;
    const target = post;

    init();
}
