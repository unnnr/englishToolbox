
import Posts from '@models/Posts'

const Cards = new function()
{
    this.get = (id) =>
    {
        let post = Posts.get(id);
        
        let card = { ...post };

        card.thumbnail = Posts.createThumbnail(post);

        console.log('card', card);
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

export default Cards;