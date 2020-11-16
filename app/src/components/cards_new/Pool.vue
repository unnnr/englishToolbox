<template>
  <transition-group 
    class="pool container"
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
      
      :favorite="post.favorite"
      rectangular

      v-context:items="createContext(post)"
      @select="selecting(post)"
      @favorite-toggle="toggleFavorite(post)"/>

  </transition-group>
</template>

<script>
import HandleRequests from '@mixins/HandleRequests'
import HandleEvents from '@mixins/HandleEvents'
import Favorites from '@models/Favorites'
import NewCard from '@components/cards_new/NewCard'
import Card from '@components/cards_new/Card'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

export default {
  components: {
    NewCard,
    Card
  },

  mixins: [ 
    HandleRequests,
    HandleEvents,
  ],

  inject: [ 'model' ],

  data() {
    return {
      favorites: [],
      posts: [],
      authenticated: false,
      canCreate: false,
    }
  },

  computed: {
    firstPost() {
      return this.reversedPosts[0];
    },

    reversedPosts() {
			return [...this.posts].reverse();
		}
  },

  mounted() {
    this.loadUser();
    this.loadPosts();

    this.listen({
      'post-selected': this.onSelected,
      'post-creating': this.onCreating,
      'post-created': this.onCreated,
      'post-deleted': this.onDeleted,
      'post-edited': this.onEdited,
    });
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
            selecting(post),

          'Edit': () =>
            this.contextEdit(post),

          'Delete' : () => 
            this.contextDelete(post)
        }
      }
    },

		getPostIndex(id) {
			for (let i = 0; i < this.posts.length; i++) {
				let post = this.posts[i];

				if (post.id ===  id)
					return i
			}

			return null;
    },

		findById(id) {
			for (let post of this.posts) {
				if (post.id ===  id)
					return post
			}

			return null;
    },
    
    select(post) {
			// Unselecting previos post
			if (this.$options.selectedPost) {
        this.$set(this.$options.selectedPost, 'selected', false);
        this.$options.selectedPost = null
      }
      
       // Selecting current post
      if (post) {
        this.$options.selectedPost = post;
        this.$set(post, 'selected', true);
      }
    },

    selecting(post) {
      // Preventing redundunt requests
      if (post
        && this.$options.selectedPost 
        && this.$options.selectedPost.id === post.id)
        return;
      
      bus.dispatch('post-selecting', { post });
    },

    selectFirst() {
      this.selecting(this.firstPost);
    },

    parseFavorites() {
      for (let favorite of this.favorites)
      {
        let post = this.findById(favorite.id);

        if (post)
          this.$set(post, 'favorite', true);
      }
    },

    async loadPosts() {
      this.posts = await this.model.all();
      this.selectFirst();

      if (this.favorites.length > 0)
        this.parseFavorites();
    },

    async loadUser() {
      let authenticated = await Auth.check();

      if (!!!authenticated)
        return;

      this.favorites = await Favorites.all()
      this.authenticated = true;

      if (this.posts.length > 0)
        this.parseFavorites();
    },

    toggleFavorite(post) {
      if (post.favorite)
        this.unFavorite(post);
      else
        this.favorite(post);
    },
    
     favorite(post) {
      if (!!!this.authenticated)
        return;

      this.send(async () => {
        await this.model.makeFavorite(post.id);
        this.$set(post, 'favorite', true);
      });
    },

    unFavorite(post) {
      if (!!!this.authenticated)
        return;

      this.send(async () => {
        await this.model.unFavorite(post.id);
        this.$set(post, 'favorite', false);
      });
    },

    // Events
    
    onSelected(event) {
      this.select(event.post);
    },

    createNew() {
      bus.dispatch('post-start-creating');
    },

    onCreating() {
      this.select(null);
    },

    async onCreated(event) {
			let post = event.post;

      this.posts.push(post);
			this.selecting(post);
    },
    
    async onEdited(event) {
			let target = event.post;
			let post = this.findById(target.id);
      
			if (post === null)
        return;
        
			Object.assign(post, target);
			this.selecting(post);
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
				this.selectFirst();
    },

    // Context menu event

    contextDelete(post) {
      function okay() {
        try {
          _this.model.delete(post.id)

          bus.dispatch('post-deleted', { post });
        }
        catch(error) {
          console.error(error); 

          bus.dispatch('alert-error');
        }
      }

      let _this = this;

      bus.dispatch('alert-warning', { 
        okay, message: 'It cannot be restored in the future',
      });
    },

    contextEdit(post) {
      bus.dispatch('post-editing', { post }),
      this.onSelected({ post });
    }
  }
}
</script>


<style>

.pool {
	position: relative;
	overflow: hidden;
}

.card--add.list-move  {
  transition: none;
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