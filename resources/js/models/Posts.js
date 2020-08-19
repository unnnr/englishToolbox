import Http from '@services/Http';
import { post } from 'jquery';

const Posts = new function ()
{
    function validateIndex(index)
    {
        if (!!!Number.isInteger(index) || index >= posts.length || index < 0)
            return false;

        return true;
    }

    async function init()
    {
        posts = await Http.get('video')

        if (!!!Array.isArray(posts))
            console.error('500 error');

        if (Posts.onload)
            Posts.onload();
    }

    function createCopy(post)
    {
        let tagsCopy = [];
            
        for (let tag of post.tags)
            tagsCopy.push({  ...tag });
        
        let postCopy= {
            index: post.id - 1,
            id: post.id, 
            title: post.title,
            videoID: post.videoID,
            description: post.description,
            mainTag: {...post.mainTag},
            tags: tagsCopy
        };

        return postCopy;
    }

    this.create = async (data) =>
    {
        let response = await Http.post('video', data);
        if (!!!response)
            return null;

        let newPost = {
            index: response.id - 1,
            tags: response.tags,
            title: response.title,
            mainTag: response.mainTag,
            videoID: response.videoID,
            description: response.description
        };

        posts.push(newPost);
        
        return createCopy(newPost);
    }

    this.get = (index) =>
    {
        if (!!!validateIndex(index))
            return null;

        let post = posts[index];

        return createCopy(post);
    }

    this.all = () =>
    {
        let postsCopy = [];
        
        for (let post of posts)
           postsCopy.push(createCopy(post));

        return [ ...postsCopy ];
    }

    let posts = [];

    init();
}();

export default Posts;