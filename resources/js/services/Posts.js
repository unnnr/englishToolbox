
import Http from './Http';
import { post } from 'jquery';

const Posts = new function ()
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

        if (Posts.onload)
            Posts.onload();
    }

    this.create = async (data, tags) =>
    {
        if (Array.isArray(tags) && tags.length)
        {
            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id) || console.log(index, tag);
        }

        let response = await Http.post('video', data);
        if (!!!response)
            return null;

        let newPost ={
            index: response.id - 1,
            tags: response.tags,
            title: response.title,
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
        return posts;
    }

   /*  this.convertToCard = (index) => 
    {
        if (!!!validateIndex(index))
            return;

        let post = posts[index];

        return {
            index: index,
            title: post.title,
            description: post.description,
            videoID: post.videoID
        }
    } */

/*     this.allCards = () =>
    {
        let cards = [];

        for (let index in posts)
            cards.push({
                ...this.getCard(index),
                id: Number(index)
            })

        return cards;
    } */

    let posts = [];

    init();
}();

export default Posts;