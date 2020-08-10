<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="(card, index) of cards" :key="index"
            :title="card.title"
            :description="card.description"
            :id="card.id"
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

        console.log(this.cards[0].id);
    },

    mounted()
    {
        bus.listen('new-card-touched', event => {
            bus.dispatch('post-creating');
        });
        
        bus.listen('card-touched', event => {
              
            let post = PostService.getPostInfo(event.card.id)

            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = event.card;
            selectedCard.selected = true;

            bus.dispatch('post-selected', { post });
        });
    }
}
</script>