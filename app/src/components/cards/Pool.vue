<template>
	<transition-group 
		name="list"
		tag="section"
		class="pool container"
		:move-class="moveClass"
		@before-leave="setAbsolute">
			
		<new-card
			postType="video"
			v-if="canCreateContent"
			:key='-1'/>
			
		<card
			v-for="card of reversePosts"

			:key="card.id"
			:title="card.id + ''"
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
import Tags from '@models/Tags';
import Auth from '@services/Auth'
import bus from '@services/eventbus';


export default {
	components: {
		Card,
		NewCard
	},

	mixins: [ HandleEvents ],

	props: {
		model: {
			type: Object,
		}
	},

	data: function () {
		return {
			canCreateContent: true,

			moveClass: 'static',

			posts: []
		};
	},

	computed: {
		reversePosts() {
			return [...this.posts].reverse();
		}
	},

	beforeMount()
	{
		this.model.all().then( async posts => {
				// Appending cards with simple animation
				this.appendCards(posts);

				// Selecting first card
				let firstPost = this.posts[0];
				if (!!!firstPost)
							return;
					
				let id = Number(firstPost.id);
				let post = await this.model.get(id);

				bus.dispatch('post-selecting', { post, preventScrolling: true });
			}
		);

	/*
			Auth.onload(() => {
					this.canCreateContent = Auth.isAdmin();
			}); */
	},

	mounted() {
		// Creating liteners 
		this.listen({
			'new-card-touched': event => {
				if (this.selectedCard)
					this.$set(this.selectedCard, 'selected', false);

				this.selectedCard = null;

				bus.dispatch('post-creating');
			},
			
			'post-created': event => {
				this.posts.push(event.post);
			}
		});

		// Selecting listeners
		this.listen({
			'card-selecting': event => {
				let selectedId = this.selectedCard.id
				let newId = event.card.$vnode.key;

				if (newId === selectedId)
					return;

				let id = Number(event.card.$vnode.key);
				let post = this.getCardById(id)
		
				bus.dispatch('post-selecting', { post });
			},

			'post-selecting': event => {
				let card = this.getCardById(event.post.id);
				
				if (this.selectedCard)
					this.$set(this.selectedCard, 'selected', false);

				this.selectedCard = card;
				this.$set(this.selectedCard, 'selected', true);
			},
		});

		// Editing listeners
		this.listen({
			'card-editing': async event => {
				let id = Number(event.card.$vnode.key);
				let post = await this.model.get(id);

				bus.dispatch('post-editing', { post });
			},

			'post-edited': event => {
				let post = this.getCardById(event.post.id);

				Object.assign(post, event.post);
			},
		});

		// Deleting listeners
		this.listen({
			'card-deleting': async event => {
				let id = Number(event.card.$vnode.key);
				let post = await this.model.get(id);

				bus.dispatch('post-deleting', { post });
			},

			'post-deleting': async event => {
				let post = event.post;

				bus.dispatch('alert-confirm', {
					message: 'Are you sure you want to remove the post?',
					
					onConfirm: async () => {
						await this.model.delete(post.id);

						bus.dispatch('post-deleted', { post });
					}
				});
			},

			'post-deleted': event => {
				let card = this.getCardById(event.post.id);
				let index = this.posts.indexOf(card);
				
				let removedPost =  this.posts.splice(index, 1)[0];

				if (this.selectedCard.id == removedPost.id)
				{
					let last = this.posts[this.posts.length - 1];
					console.log(last, 'here');
					bus.dispatch('post-selecting', { post:  last});
				}
			}
		});
	},

	methods: {
		setAbsolute(card) {
			Object.assign(card.style, {
				position: 'absolute',
				width: card.offsetWidth + 'px',
				top: card.offsetTop + 'px',
				left: card.offsetLeft + 'px'
			})
		},

		getCardById(id) {
			for (const card of this.posts)
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

			const poolCards = this.posts;
			const self = this;

			this.moveClass = 'static';

			appendRecursively(cards);
		}
	}
}
</script>

<style scoped>

.pool {
	position: relative;
	overflow: hidden;
}

.list-move {
  transition: transform 1s ease-in-out,
  						opacity 1s ease-in-out;
}

.list-enter-active
{
   -webkit-animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.list-leave-active {
	-webkit-animation: scale-out 5.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out 5.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
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