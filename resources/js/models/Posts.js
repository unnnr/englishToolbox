import Http from '@services/Http';

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
        
        return newPost;
    }

    this.get = (index) =>
    {
        if (!!!validateIndex(index))
            return null;

        let post = posts[index];
        return { ...post };
    }

    this.all = () =>
    {
        for (let index in posts)
            posts[index].index = Number(index);

        console.log(posts);
        return posts;
    }

    let posts = [];

    init();
}();

export default Posts;