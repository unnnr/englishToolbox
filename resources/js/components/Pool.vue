<template>
    <transition-group name="list" tag="section" class="pool container">
        <new-card
            postType="video"
            :key='-1'/>
        <card
            v-for="({index, tags, mainTag, title, selected, thumbnail, description}) of reversed"
            :key="index"
            :tags="tags"
            :title="title"
            :mainTag="mainTag"
            :selected="selected"
            :imageUrl='thumbnail'
            :description="description"
            />
    </transition-group>
</template>

<script>

import bus from '@services/eventbus';
import Posts from '@models/Posts';
import Cards from '@models/Cards';
import Tags from '@models/Tags';
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

            bus.dispatch('post-creating');
        });
        
        bus.listen('card-selecting', event => {

            if (event.card === this.selectedCard)
                return;

            let post = Posts.get(Number(event.card.$vnode.key));
            
            bus.dispatch('post-selecting', { post });
        });

        bus.listen('card-editing', event => {

            let post = Posts.get(Number(event.card.$vnode.key));

            bus.dispatch('post-editing', { post });
        });

        bus.listen('post-created', event => {

            let newCard = Cards.get(event.post.index);

            this.cards.push(newCard);
        });

         bus.listen('post-edited', event => {
            
            let post = event.post;
            let newCard = Cards.get(post.index);
            let card = this.getCardById(post.id);

            console.log(card, newCard);

            Object.assign(card, newCard);

        });

        bus.listen('post-selecting', event => {

            for (const card of this.cards)
            {
                if (card.id === event.post.id)
                {
                    if (this.selectedCard)
                        this.$set(this.selectedCard, 'selected', false);

                    this.selectedCard = card;
                    this.$set(this.selectedCard, 'selected', true);

                    break;
                }
            }
        });
    },

    methods: {
        getCardById(id) {
            
            for (const card of this.cards)
            {
                if (card.id == id)
                    return card;
            }
        }
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