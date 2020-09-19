<template>
	<transition-group 
		name="list"
		tag="section"
		class="pool container"
		:move-class="moveClass">
			
		<new-card
			postType="video"
			v-if="canCreateContent"
			:key='-1'/>
		<card
			v-for="card of reversed"

			:key="card.id"
			:title="card.title"
			:imageUrl='card.thumbnail'
			:createdAt="card.createdAt"
			:description="card.description"
			
			:tags="card.tags"
			:mainTag="card.mainTag"
			
			:selected="card.selected"
			:editable="canCreateContent"
			
			rectangle-form/>
	</transition-group>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import NewCard from '@components/cards/NewCard.vue';
import Card from '@components/cards/Card.vue';
import Posts from '@models/Posts';
import Cards from '@models/Cards';
import Tags from '@models/Tags';
import Auth from '@services/Auth'
import bus from '@services/eventbus';


export default {
	components: {
		Card,
		NewCard
	},

	mixins: [ HandleEvents ],

	data: function () {
		return {
			canCreateContent: false,

			moveClass: 'static',

			cards: []
		};
	},

	computed: {
		reversed() {
			return [...this.cards].reverse();
		}
	},

	beforeMount()
	{
	/*     Posts.onload(() => {

					this.appendCards(Cards.all());

					let firstCard = this.cards[0];
					if (!!!firstCard)
							return;
					
					let id = Number(firstCard.id);
					let post = Posts.get(id);

					bus.dispatch('post-selecting', { post, preventScrolling: true });
			}, 1000);

			Auth.onload(() => {
					this.canCreateContent = Auth.isAdmin();
			}); */
	},

	mounted()
	{
		this.listen({
			// Creating liteners 

			'new-card-touched': event => {
				if (this.selectedCard)
					this.$set(this.selectedCard, 'selected', false);

				this.selectedCard = null;

				bus.dispatch('post-creating');
			},
			
			'post-created': event => {
				let newCard = Cards.get(event.post.id);

				this.cards.push(newCard);
			},

			// Selecting listeners

			'card-selecting': event => {
				if (event.card === this.selectedCard)
					return;

				let post = Posts.get(Number(event.card.$vnode.key));
		
				bus.dispatch('post-selecting', { post });
			},

			'post-selecting': event => {
				let card = this.getCardById(event.post.id);

				if (this.selectedCard)
					this.$set(this.selectedCard, 'selected', false);

				this.selectedCard = card;
				this.$set(this.selectedCard, 'selected', true);
			},

			// Editing listeners

			'card-editing': event => {
				let post = Posts.get(Number(event.card.$vnode.key));

				bus.dispatch('post-editing', { post });
			},

			'post-edited': event => {
				let post = event.post;
				let newCard = Cards.get(post.id);
				let card = this.getCardById(post.id);

				Object.assign(card, newCard);
			},

			// Deleting listeners

			'card-deleting': event => {
				let post = Posts.get(Number(event.card.$vnode.key));

				bus.dispatch('post-deleting', { post });
			},

			'post-deleting': async event => {
				let post = event.post;

				bus.dispatch('alert-confirm', {
					message: 'Are you sure you want to remove the post?',
					
					onConfirm: async () => {
						await Posts.delete(post.id);

						bus.dispatch('post-deleted', { post });
					}
				});
			},

			'post-deleted': event => {
				let card = Cards.get(event.post.id);

				if (this.selectedCard == card)
					bus.dispatch('post-selecting', { card: this.cards[0] });

				let index = this.cards.indexOf(card);
				this.cards.splice(index, 1);
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
			},

			appendCards(cards)  {
				function appendRecursively(newCards) {
					let card = newCards.pop();
					
					if (!!!card)
					{
						// Set the default move class when the animation has finished playing 
						setTimeout(() => self.moveClass = 'list-move', DURATION);
						return;
					}

					poolCards.unshift(card);

					// Set the delay between animations
					setTimeout(() => appendRecursively(cards), DELAY);
				}
				
				const DELAY = 130;
				const DURATION = 500;

				const poolCards = this.cards;
				const self = this;

				this.moveClass = 'static';

				appendRecursively(cards);
			}
	}
}
</script>

<style scoped>

.list-move {
  transition: 
  transform 1s ease-in-out,
  opacity 1s ease-in-out;
}


.list-enter-active
{
   -webkit-animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
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
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
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