
import Http from './HttpService';

const PostService = new function ()
{
    function validateIndex(index)
    {
        if (index >= posts.length || index < 0)
            return false;
        return true;
    }

    async function init()
    {
        posts = await Http.get('video')

        if (!!!Array.isArray(posts))
            console.error('500 error');

        if (PostService.onload)
            PostService.onload();
    }

    this.createPost = async (data) =>
    {
        let post = await Http.post('video', data);
        if (!!!post)
            return null;

        posts.push({
            id: post.id,
            title: post.title,
            videoID: post.videoID,
            description: post.description
        });

        return this.getPostInfo(posts.length-1);
    }

    this.getPostInfo = (index) =>
    {
        if (!!!validateIndex(index))
            return;

        let post = posts[index];

        return {
            title: post.title,
            description: post.description,
            contentID: post.videoID,
            index: index,
            date: '22',
            tags: post.tags
        };
    }

    this.getCard = (index) => 
    {
        if (!!!validateIndex(index))
            return;

        let post = posts[index];

        return {
            index: index,
            title: post.title,
            description: post.description,
            thumbnail: `https://i.ytimg.com/vi/${post.videoID}/sddefault.jpg`
        }
    }

    this.allCards = () =>
    {
        let cards = [];

        for (let index in posts)
            cards.push({
                ...this.getCard(index),
                id: Number(index)
            })

        return cards;
    }

    let posts = [];

    init();
}();

export default PostService;