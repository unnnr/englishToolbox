
import Posts from './Posts'

const Cards = new function()
{
    this.get = (index) =>
    {
        let post = Posts.get(index);
        let card = { ...post };

        card.thumbnail =`https://i.ytimg.com/vi/${post.videoID}/sddefault.jpg`
        
        return card;
    }

    this.all = () =>
    {
        let cards = [];

        for (let post of Posts.all())
        {
            let card = { ...post };

            card.thumbnail =`https://i.ytimg.com/vi/${post.videoID}/sddefault.jpg`;

            cards.push(card);
        }

        return cards;
    }
}();

export default Cards;