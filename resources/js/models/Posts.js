import Http from '@services/Http';
import getYouTubeID from 'get-youtube-id';

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

    function getById(id)
    {
        for (const post of posts)
        {
            if (post.id == id)
                return post;
        }
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

    function isFormDataEmpty(data)
    {
        if (data.values().next())
            return false;

        return true;
    }

    function compareDataWithTags(data, tags)
    {
        for (const index in tags)
        {
            let tag =  tags[index];

            if (tag.id !== data.get(`tags[${index}]`))
                return;
        }

        for (const index in tags)
            data.delete(`tags[${index}]`);
    }

    this.create = async (data) =>
    {
        let response = await Http.post('video', data);
        if (!!!response)
            return null;

        let newPost = {
            id: response.id,
            tags: response.tags,
            title: response.title,
            mainTag: response.mainTag,
            videoID: response.videoID,
            description: response.description
        };

        posts.push(newPost);
        
        return createCopy(newPost);
    }

    this.edit = async (id, data) =>
    {
        let target = getById(id);
        
        let videoID = getYouTubeID(String(data.get('videoUrl')));
        if (target.videoID === videoID)
            data.delete('videoUrl');
        
        let description = data.get('description');
        if (target.description === description)
            data.delete('description');

        let mainTag = data.get('mainTag');
        if (target.mainTag.id == mainTag)
            data.delete('mainTag');

        compareDataWithTags(data, target.tags)

        if (isFormDataEmpty(data))
            return createCopy(target);

        let response = await Http.patch('video/' + id, data);
        if (!!!response)
            return null; 

        target.tags = response.tags,
        target.title = response.title,
        target.mainTag = response.mainTag,
        target.videoID = response.videoID,
        target.description = response.description

        return createCopy(target);
    }

    this.delete = async (id) =>
    {
        let response = await Http.delete('video/' + id);
        if (!!!response)
            return null;
            
        return response;
    } 

    this.get = (id) =>
    {
        let post = getById(id)

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