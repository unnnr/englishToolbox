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
		reversed() {
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

	mounted()
	{
		// Creating liteners 
		this.listen({
			'new-card-touched': event => {
				if (this.selectedPost)
					this.$set(this.selectedPost, 'selected', false);

				this.selectedPost = null;

				bus.dispatch('post-creating');
			},
			
			'post-created': event => {
				this.posts.push(event.post);
			}
		});

		// Selecting listeners
		this.listen({
			'card-selecting': async event => {
				if (event.card === this.selectedPost)
					return;

				let id = Number(event.card.$vnode.key);
				let post = await this.model.get(id);
		
				bus.dispatch('post-selecting', { post });
			},

			'post-selecting': event => {
				if (this.selectedPost)
					this.$set(this.selectedPost, 'selected', false);

				this.selectedPost = event.post;
				this.$set(this.selectedPost, 'selected', true);
			},
		});

		// Editing listeners
		this.listen({
			'card-editing': async event => {
				let post = await this.model.get(Number(event.card.$vnode.key));

				bus.dispatch('post-editing', { post });
			},

			'post-edited': async event => {
				let post = event.post;
				let newPost = await this.model.get(post.id);
				let card = this.getCardById(post.id);

				Object.assign(card, newPost);
			},
		});

		// Deleting listeners
		this.listen({
			'card-deleting': event => {
				return 'Not working';

				let post = Posts.get(Number(event.card.$vnode.key));

				bus.dispatch('post-deleting', { post });
			},

			'post-deleting': async event => {
				return 'Not working';

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

				return 'Not working';

				let card = Cards.get(event.post.id);

				if (this.selectedPost == card)
					bus.dispatch('post-selecting', { card: this.posts[0] });

				let index = this.posts.indexOf(card);
				this.posts.splice(index, 1);
			}
		});
	},

	methods: {
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