const PostService = new function ()
{
    this.getPostInfo = (index) =>
    {
        return posts[index];
    }
    
    this.getCard = (index) => 
    {
        let thumbnail;
        let title;
        let description;

        title = posts[index].title;
        description = posts[index.description];
        thumbnail = 'https://img.youtube.com/vi/x9iDXnO_d4s/0.jpg';

        return {
            title, thumbnail, description
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

        console.log(cards, '12');
        return cards;
    }

    const posts = [
        { title: 'title 1', description: 'description for this video'},
        { title: 'title 12', description: 'description for this video'},
        { title: 'title 123', description: 'description for this video'},
        { title: 'title 3', description: 'description for this video'},
    ]
}();

export default PostService;