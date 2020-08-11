<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="({title, description, thumbnail}, index) of cards"
            :key="index"
            :title="title"
            :imageUrl='thumbnail'
            :description="description"
            :id="index"
        />
    </section>
</template>

<script>
import Card from './Card.vue';
import NewCard from './NewCard.vue';
import bus from '../eventbus';
import PostService from '../services/PostService';


let selectedCard = null;

export default {
    name: 'pool',

    data: function () {
        return {
            cards : []
        };
    },

    components: {
        Card,
        NewCard
    },

    beforeMount()
    {
        this.cards = PostService.allCards();
    },

    mounted()
    {

        bus.listen('new-card-touched', event => {
            if (selectedCard)
                selectedCard.selected = false;
            selectedCard = null;

            bus.dispatch('post-editing');
        });
        
        bus.listen('card-touched', event => {
             if (event.card === selectedCard)
                return;

            let post = PostService.getPostInfo(event.card.id)
            bus.dispatch('post-selected', { post });
        });
        

        bus.listen('post-created', event => {
            let newCard = PostService.getCard(event.post.index);

            this.cards.push(newCard);
        })

        bus.listen('post-selected', event => {
            let card = PostService.getCard(event.post.index);

            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = card;
            selectedCard.selected = true;
        })
    }
}
</script>