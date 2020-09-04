
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

    function createInstance(response)
    {
        return {
            message: response.text, 
            sender: 'name',
            date: '19 may 2020',
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

        console.log(postType);
        
        let response = await Http.get(`api/${postType}/${postId}/comments`);

        let parsed = [];

        for (const comment of response)
        {
            parsed.push(
                createInstance(comment)
            );              
        }
            console.log(parsed);
        return parsed;
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