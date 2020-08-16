import Http from './Http';

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

    this.create = async (data, tags) =>
    {
        if (Array.isArray(tags) && tags.length)
        {
            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id);
        }

        let responce = await Http.post('video', data);
        /* let responce = {
            id: data.get('index'),
            tags: [],
            title: 'titl',
            videoID: 'dads',
            description: 'asddsdsds',
        }; */

        if (!!!responce)
            return null;

        let newPost = {
            index: responce.id - 1,
            tags: responce.tags,
            title: responce.title,
            videoID: responce.videoID,
            description: responce.description
        };
        
        posts.push(newPost);

        console.log(newPost);
        return newPost;
    }

    this.get = (index) =>
    {
        if (!!!validateIndex(index))
            return null;

        console.log(posts, index);
        let post = posts[index];
        return { ...post };
    }

    this.all = () =>
    {
        for (let index in posts)
            posts[index].index = index;

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