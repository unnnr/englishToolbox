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
			
			:selected="card.selected"
			:editable="canCreateContent"
			:favorite="favorite"
			rectangle-form
			
			:tags="card.tags"
			:mainTag="card.mainTag"
			
			@favorite:toggle="toggleFavorite(card)"/>
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
				if (posts.length === 0)
				{	
					bus.dispatch('overlay-showing--empty');

					return;
				}

				// Appending cards with simple animation
				this.appendCards(posts);

				// Selecting first card
				let firstPost = this.posts[0];
				
				let id = Number(firstPost.id);
				let post = await this.model.get(id);

				bus.dispatch('post-selecting', { post, preventScrolling: true });
			}
		)
		.catch( () => bus.dispatch('overlay-showing--empty'));

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

				let selectedId = this.selectedCard ? this.selectedCard.id : null;
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
					
					bus.dispatch('post-selecting', { post:  last});
				}

				if (this.posts.length)
					bus.dispatch('overlay-showing--empty');
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
		},

		toggleFavorite(card) {
			console.log(123);
			this.$set(card, 'favorite', !!!card.favorite);
		}
	}
}
</script>
