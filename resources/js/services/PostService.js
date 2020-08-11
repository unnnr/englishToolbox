import { post } from "jquery";

const PostService = new function ()
{
    this.createPost = async (data) =>
    {
        let token = document.querySelector('meta[name="csrf-token"]').content;
        data.set('_token', token);

        let responce = await fetch(window.location.origin + '/videos', {
            method: 'POST', 
            body: data,
            headers: {
                'X-CSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        if (!!!responce.ok)
            return null;
        
        responce = await responce.json();
    
        posts.push({
            title: responce.title,
            description: responce.description,
            id: responce.videoID
        });

        console.log(posts);
        
        return this.getPostInfo(posts.length-1);
    }
    

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