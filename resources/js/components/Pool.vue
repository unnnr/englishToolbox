<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="({title, description, thumbnail, id}, index) of cards" :key="index"
            :title="title"
            :imageUrl='thumbnail'
            :description="description"
            :id="id"
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
            bus.dispatch('post-creating');
        });
        
        bus.listen('card-touched', event => {
              
            if (event.card === selectedCard)
                return;

            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = event.card;
            selectedCard.selected = true;

            let post = PostService.getPostInfo(event.card.id)

            bus.dispatch('post-selected', { post });
        });
    }
}
</script>