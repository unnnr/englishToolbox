
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

        console.log(post, 12, 123213);
        posts.push({
            title: post.title,
            description: post.description,
            videoID: post.videoID
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

    //  { title: 'Lorem ipsum dolor sit amet', id: 'dQw4w9WgXcQ', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'},
    // { title: 'Lorem ipsum dolor sit amet', id: 'G1IbRujko-A', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'}
 
    init();
}();

export default PostService;