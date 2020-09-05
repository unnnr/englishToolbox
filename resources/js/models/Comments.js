
import Http from '@services/Http';
import Posts from '@models/Posts'
import FormatedDate from '@services/FormatedDate'

const Tags = new function ()
{
    async function load()
    {
        comments = await Http.get('api/tags');
        
        loaded = true;

        for (const callback of callbacks)
            callback();
    } 

    function createInstance(response)
    {        
        return {
            message: response.message, 
            sender: response.sender.name,
            date: FormatedDate.parse(response.created_at),//'19 may 2020',
            id: response.id,
        }
    }

    this.all = () =>
    {
        let selectedComments = [];
    
        for (const comments of comments)
        {
            selectedComments.push(
                createInstance(comment)
            );              
        }
        
        return selectedComments;
    }

    this.getAttached = async (postId) => 
    {
        let postType = Posts.getModelLabel();
        
        let response = await Http.get(`api/${postType}/${postId}/comments`);

        let parsed = [];

        for (const comment of response)
        {
            parsed.push(
                createInstance(comment)
            );              
        }
        
        return parsed;
    }
    
    this.create = async (postId, data) =>
    {
        let postType = Posts.getModelLabel();

        let response = await Http.post(`api/${postType}/${postId}/comments`, data);
        
        return createInstance(response);
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