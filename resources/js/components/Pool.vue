<template>
    <transition-group name="list" tag="section" class="pool container">
        <new-card
            postType="video"
            :key='-1'/>
        <card
            v-for="({title, description, thumbnail, tags, index}) of reversed"
            :key="index"
            :tags="tags"
            :title="title"
            :imageUrl='thumbnail'
            :description="description"/>
    </transition-group>
</template>

<script>

import bus from '../eventbus';
import Posts from '../services/Posts';
import Cards from '../services/Cards';
import Card from './Card.vue';
import NewCard from './NewCard.vue';
import Tags from '../services/Tags';


let selectedCard = null;

export default {
    name: 'pool',

    data: function () {
        return {
            cards : []
        };
    },

    computed: {
          reversed() {
            return [...this.cards].reverse();
        }
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

            let post = Posts.get(Number(event.card.$vnode.key));
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

<style scoped>
.list-move {
  transition: transform 1s;
}

.list-enter
{
    opacity: 0;
}

.list-enter-active
{
    opacity: 0;
}
</style>