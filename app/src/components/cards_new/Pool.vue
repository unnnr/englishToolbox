<template>
  <transition-group 
    class="pool container pe"
		tag="section"
  	name="list"
    @before-leave="setAbsolute">

    <new-card 
      :key="-1"
      @click="createNew"/>

    <card 
      v-for="post in reversedPosts"
      :key="post.id"
      :class="{'card--selected': post.selected }"
      
      :description="post.description"
      :created-at="post.createdAt"
      :title="post.title"
      :views="post.views"
      :img="post.thumbnail"

      :main-tag="post.mainTag"
      :tags="post.tags"

      @select="select(post)"
      v-context:items="createContext(post)"

      rectangular/>

  </transition-group>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'
import NewCard from '@components/cards_new/NewCard'
import Card from '@components/cards_new/Card'
import bus from '@services/eventbus'

import FakeData from '@services/FakeData';

export default {
  components: {
    NewCard,
    Card
  },

  mixins: [ HandleEvents ],

  data() {
    return {
      posts: []
    }
  },

  computed: {
    firstPost() {
      return this.posts[0];
    },

    reversedPosts() {
			return [...this.posts].reverse();
		}
  },

  mounted() {
    this.posts = FakeData.generatePosts();

    this.listen({
      'post-created': this.onCreated,
      'post-deleted': this.onDeleted,
      'post-edited': this.onEdited,
    });

    this.select(this.firstPost);
  },

  methods: {
    setAbsolute(target) {
			Object.assign(target.style, {
				position: 'absolute',
				width: target.offsetWidth + 'px',
				top: target.offsetTop + 'px',
				left: target.offsetLeft + 'px'
			})
    },

    createContext(post) {
      return () => {
        return {
          'Open': () => 
             this.select(post),

          'Edit': () =>  {
            let newPost = FakeData.createPost('');
            newPost.id = post.id

            bus.dispatch('post-edited', { post: newPost });
          },

          'Delete' : () =>  {
            bus.dispatch('alert-warning', { 
              okay: () => bus.dispatch('post-deleted', { post })
            })
          },

        }
      }
    },

		getPostIndex(id) {
			for (let i = 0; i < this.posts.length; i++)
			{
				let post = this.posts[i];

				if (post.id ===  id)
					return i
			}

			return null;
    },

		findById(id) {
			for (let post of this.posts)
			{
				if (post.id ===  id)
					return post
			}

			return null;
    },
    
    select(post) {
			// Preventing redundunt requests
      if (this.$options.selectedPost 
        && this.$options.selectedPost.id === post.id)
        return;

			// Unselecting previos post
			if (this.$options.selectedPost)
				this.$set(this.$options.selectedPost, 'selected', false)

			// Selecting current post
			this.$options.selectedPost = post;
			this.$set(post, 'selected', true)

			// Emitting event
			bus.dispatch('post-selecting', { post });
    },

    // Events
    
    createNew() {
      bus.dispatch('post-creating');
    },

    async onCreated(event) {
			let post = event.post;

      this.posts.push(post);
			this.select(post);
    },
    
    async onEdited(event) {
			let target = event.post;
			let post = this.findById(target.id);
      
			if (post === null)
        return;
        
			Object.assign(post, target);
			this.select(post);
		},
    
    async onDeleted(event) {
			let deletedPost = event.post;
			let index = this.getPostIndex(deletedPost.id);
				
			if (index === null)
				return;
			
			// If removed post was selected, we need select another
			let removedPost = this.posts.splice(index, 1)[0];

			if (this.$options.selectedPost 
					&& removedPost.id === this.$options.selectedPost.id)
				this.select(this.firstPost);
    }
  }
}
</script>


<style>

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
	-webkit-animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
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