
import Http from '@services/Http';
import Posts from '@models/Posts'

const Tags = new function ()
{
    async function load()
    {
        comments = await Http.get('api/tags');
        
        loaded = true;

        for (const callback of callbacks)
            callback();
    } 

    this.all = () =>
    {
        let selectedComments = [];
    
        for (const comments of comments)
        {
            selectedTags.push({
                ...comments
            });              
        }
        
        return se ;
    }

    this.getAttached = (postId) => 
    {
        let postType = Posts.getModelName();
        
        let response = await Http.post(`api/${postType}/${postId}/comments`, data);

        return {
            id: response.id,
            text: response.text
        };
    }
    
    this.create = async (data) =>
    {
        let response = await Http.post('api/comment', data);
        
        return {
            id: response.id,
            text: response.text
        };
    }

    this.remove = async () =>
    {
        let response = await Http.delete('api/comment', data);
    }

    this.onload = (callback) =>
    {
        if (loaded)
        {
            callback();
            return;
        }

        callbacks.push(callback);
    }

    let comments = [];
    let loaded  = false;
    let callbacks = [];

    load();
}();
   
export default Tags;