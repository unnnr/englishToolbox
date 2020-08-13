<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="({title, description, thumbnail}, index) of cards"
            :key="index"
            :title="title"
            :imageUrl='thumbnail'
            :description="description"/>
    </section>
</template>

<script>

import bus from '../eventbus';
import Posts from '../services/Posts';
import Cards from '../services/Cards';
import Card from './Card.vue';
import NewCard from './NewCard.vue';


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
        Posts.onload = () => {
            this.cards = Cards.all()
        };
    },

    mounted()
    {
        // Init listeners
        bus.listen('new-card-touched', event => {

            if (selectedCard)
                selectedCard.selected = false;
            selectedCard = null;

            bus.dispatch('post-editing');
        });
        
        bus.listen('card-touched', event => {

            if (event.card === selectedCard)
                return;

            let post = Posts.get(event.card.$vnode.key)

            bus.dispatch('post-selected', { post });
        });

        bus.listen('post-created', event => {

            let newCard = Cards.get(event.post.index);

            this.cards.push(newCard);
        });

        bus.listen('post-selected', event => {

            let card = Cards.get(event.post.index);

            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = card;
            selectedCard.selected = true;
        });
    }
}
</script>