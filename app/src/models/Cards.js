/* const Cards = new function()
{
    
    this.get = (id) =>
    {
        let post = Posts.get(id);
        
        let card = { ...post };

        card.thumbnail = Posts.createThumbnail(post);

        return card;
    }

    this.all = () =>
    {
        let cards = [];

        for (let post of Posts.all())
        {
            let card = { ...post };

            card.thumbnail = Posts.createThumbnail(post);

            cards.push(card);
        }

        return cards;
    }
}(); 


class Cards 
{
    collection(posts) 
    {
        return [
            posts
        ]
    }
}

export default Cards;*/
