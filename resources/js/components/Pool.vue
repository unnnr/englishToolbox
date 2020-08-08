<template>
    <section class="pool container">
        <new-card postType="video" />
        <card
            v-for="(post, index) of posts" :key="index"
            :post="post"
        />
    </section>
</template>

<script>
import Card from './Card.vue';
import NewCard from './NewCard.vue';

export default {
    name: 'pool',

    data: function () {
        return {
        
            posts: [
                {title: 'title', description: 'description', url: 'link'},
                {title: 'title', description: 'description', url: 'link'},
                {title: 'title', description: 'description', url: 'link'},
                {title: 'title', description: 'description', url: 'link'},
                {title: 'title', description: 'description', url: 'link'}
            ]
        };
    },

    components: {
        Card,
        NewCard
    }
}
</script>