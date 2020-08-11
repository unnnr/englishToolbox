import { post } from "jquery";

const PostService = new function ()
{
    this.getPostInfo = (index) =>
    {
        let post = posts[index];

        return {
            title: post.title,
            description: post.description,
            contentID: post.id,
            index: index,
            date: '22',
        };
    }

    this.createPost = (data) =>
    {
        let post = {};
        for (const [key, value] of data)
            post[key] = value;

        posts.push({
            ...post,
            title: 'Lorem ipsum dolor sit amet'
        });

        console.log(posts[posts.length-1]);

        return this.getPostInfo(posts.length-1);
    }
    
    this.getCard = (index) => 
    {
        let post = posts[index];

        return {
            index: index,
            title: post.title,
            description: post.description,
            thumbnail: `https://i.ytimg.com/vi/${post.id}/sddefault.jpg`
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

    const posts = [
        { title: 'Lorem ipsum dolor sit amet', id: 'dQw4w9WgXcQ', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'},
        { title: 'Lorem ipsum dolor sit amet', id: 'G1IbRujko-A', description: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'}
    ]
}();

export default PostService;