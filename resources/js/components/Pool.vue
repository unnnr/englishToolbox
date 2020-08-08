<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="(post, index) of posts" :key="index"
            :post="post"
            :index="index"
        />
    </section>
</template>

<script>
import Card from './Card.vue';
import NewCard from './NewCard.vue';
import bus from '../eventbus';

let selectedCard = null;

export default {
    name: 'pool',

    data: function () {
        return {
       
            posts: [
                {title: 'title 1', description: 'description 1', url: 'link'},
                {title: 'title 2', description: 'description 2', url: 'link'},
                {title: 'title 3', description: 'description 3', url: 'link'},
                {title: 'title 5', description: 'description 4', url: 'link'},
                {title: 'title 7', description: 'description 6', url: 'link'}
            ]
        };
    },

    components: {
        Card,
        NewCard
    },

    mounted()
    {
        bus.listen('card-selected', event => {
            let post = this.posts[event.index]; 

            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = event.card;
            selectedCard.selected = true;

            bus.dispatch('post-selecting', {post: post});
        });
    }
}
</script>