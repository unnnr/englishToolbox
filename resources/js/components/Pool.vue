<template>
    <transition-group name="list" tag="section" class="pool container">
        <new-card
            postType="video"
            :key='-1'/>
        <card
            v-for="({index, tags, title, selected, thumbnail, description}) of reversed"
            :key="index"
            :tags="tags"
            :title="title"
            :selected="selected"
            :imageUrl='thumbnail'
            :description="description"/>
    </transition-group>
</template>

<script>

import bus from '@services/eventbus';
import Posts from '@services/Posts';
import Cards from '@services/Cards';
import Tags from '@services/Tags';
import Card from '@components/Card.vue';
import NewCard from '@components/NewCard.vue';


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

            if (this.selectedCard)
                this.$set(this.selectedCard, 'selected', false);
            this.selectedCard = null;

            bus.dispatch('post-editing');
        });
        
        bus.listen('card-touched', event => {

            if (event.card === this.selectedCard)
                return;

            let post = Posts.get(Number(event.card.$vnode.key));
            bus.dispatch('post-selected', { post });
        });

        bus.listen('post-created', event => {

            let newCard = Cards.get(event.post.index);

            this.cards.push(newCard);
        });

        bus.listen('post-selected', event => {

            /* let card = Cards.get(event.post.index);
            if (selectedCard)
                selectedCard.selected = false;

            selectedCard = card;
            selectedCard.selected = true; */

            for (const card of this.cards)
            {
                console.log(card.id, event.post.id);

                if (card.id === event.post.id)
                {
                    console.log('found');

                    if (this.selectedCard)
                        this.$set(this.selectedCard, 'selected', false);

                    this.selectedCard = card;
                    this.$set(this.selectedCard, 'selected', true);

                    break;
                }
            }
        });
    }
}
</script>

<style scoped>
.list-move {
  transition: transform 1s;
}


.list-enter-active
{
   -webkit-animation: scale-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}
@keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

</style>