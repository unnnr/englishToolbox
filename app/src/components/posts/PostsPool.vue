<template>
  <pool 
    ref="pool"
    class="container"

    :can-create="canCreate"
    :context="createContext"
    :cards="parsedPosts"

    @favorite-toggle="toggleFavorite"
    @create-new="createNew"
    @select="selecting"/>
</template>

<script>
import { throttle } from 'throttle-debounce';
import HandleTagsDeletion from '@mixins/HandleTagsDeletion';
import HandleRequests from '@mixins/HandleRequests'
import HandleEvents from '@mixins/HandleEvents'
import Favorites from '@models/Favorites'
import Pool from '@components/cards_new/Pool'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

export default {
  components: {
    Pool
  },

  mixins: [ 
    HandleTagsDeletion,
    HandleRequests,
    HandleEvents,
  ],

  inject: [ 'model' ],

  data() {
    return {
      paginationStep: 6,

      favorites: [],
      posts: [],
      parsedPosts: [],
      
      authenticated: false,
      canCreate: true,
    }
  },

  computed: {
    firstPost() {
      return this.reversedPosts[0];
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

      'tag-deleted': this.onTagDeleted
    });

    this.$options.scrollEvent = throttle(200, this.onScroll);
    document.addEventListener('scroll', this.$options.scrollEvent)
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this.$options.scrollEvent)
  },

  methods: {
    createContext(post) {
      return () => {
        let context = {};
        // Guest context
        context['Open'] = 
          () => this.selecting(post);

        if (!!!this.authenticated)
          return context;

        // User context
        context[post.favorite ? 'Unfavorite' : 'Favorite'] = 
          () => this.toggleFavorite(post);
        
        if (!!!this.canCreate)
          return context;

        // Admit context
        context['Edit'] = 
          () => this.contextEdit(post);

        context['Delete'] = 
          () => this.contextDelete(post)

        return context;
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
        
        // Updating url without appending it to router history
        if (this.$route.params.id === post.id)
          return;

        this.$router.replace({ params: { id: post.id} }).catch(() => null);
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
        let post = this.findById(favorite.post.id);

        if (post)
          this.$set(post, 'favorite', true);
      }
    },

    reverse(posts) {
      return [...posts].reverse();
    },

    filter(posts) {
      return posts;
    },

    paginate(posts) {
      // this.$options.paginatedIndex 
      let to = this.paginationStep;

      // Moving index if 'Create new' button shown
      if (this.canCreate)
        to--;

      if (to > posts.length)
        to = posts.length;

      let paginated = [];
      for (let i = 0; i < to; i++)
        paginated.push(posts[i]);

      return paginated
    },

    movePagination(parsed, posts) {
      let from = parsed.length;
      let to = from + this.paginationStep;

      if (to > posts.length)
        to = posts.length;

      for (let i = from; i < to; i++) {
        let post = posts[i];
        parsed.push(post);
      }
    },

    parsePosts() {
      let filtered = this.filter(this.posts);
      let reversed = this.reverse(filtered);
      let paginated = this.paginate(reversed);

      this.reversedPosts = reversed;
      this.parsedPosts = paginated;
    },

    async loadPosts() {
      this.posts = await this.model.all();
      
      if (this.favorites.length > 0)
        this.parseFavorites();
    
      let id = parseInt(this.$route.params.id);
      let post = this.findById(id);

      if (post)
        this.selecting(post);
      else
        this.selectFirst();

      this.parsePosts();
    },

    async loadUser() {
      let authenticated = await Auth.check();

      if (!!!authenticated)
        return;

      this.favorites = await this.model.favorites();
      this.authenticated = true;

      if (this.posts.length > 0)
        this.parseFavorites();
    },

    toggleFavorite(post) {
      if (post.favorite)
        this.unfavorite(post);
      else
        this.favorite(post);
    },
    
    favorite(post) {
      if (!!!this.authenticated)
        return;

      this.send(async () => {
        let favorite = await this.model.makeFavorite(post.id);
        this.favorites.push(favorite);
        
        this.$set(post, 'favorite', true);
      });
    },

    unfavorite(post) {
      if (!!!this.authenticated)
        return;

      this.send(async () => {
        let removedFavorite = null;
        
        for (let favorite of this.favorites) {
          if (post.id !== favorite.post.id)
            continue;

          removedFavorite = favorite;
          break;
        }
        
        if (removedFavorite === null)
          return;

        await Favorites.delete(removedFavorite.id);
        let index = this.favorites.indexOf(removedFavorite);
        this.favorites.splice(index, 1)

        this.$set(post, 'favorite', false);
      });
    },

    // Events

    onScroll() {
      let pool = this.$refs.pool.$el;
      if (!!!pool)
        return;

      const OFFSET = 100;

      let viewportHeight = window.innerHeight;
      let lastCard = pool.lastElementChild;
      let bottom = lastCard.getBoundingClientRect().bottom;

      if (bottom - OFFSET > viewportHeight)
        return;

      this.movePagination(this.parsedPosts, this.reversedPosts);
    },
    
    onSelected(event) {
      let post = null;

      if (event.post)
        post = this.findById(event.post.id);
  
      this.select(post);
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
      this.reversedPosts.unshift(post);
      this.parsedPosts.unshift(post);

		  bus.dispatch('post-selecting', { 
        post, withoutAlert: true,
      });
    },
    
    async onEdited(event) {
			let target = event.post;
			let post = this.findById(target.id);
      
			if (post === null)
        return;
        
      Object.assign(post, target);
      bus.dispatch('post-selecting', { 
        withoutAlert: true,
        post: target
      });
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
      
      index = this.reversedPosts.indexOf(removedPost);
      if (index !== -1) 
        this.reversedPosts.splice(index, 1);

      index = this.parsedPosts.indexOf(removedPost);
      if (index !== 1)
        this.parsedPosts.splice(index, 1);        
    },

    async onTagDeleted(event) {
      let tag = event.tag;

      for (let post of this.posts)
        this.removeTagFromPost(tag, post);
    },


    // Context menu event

    contextDelete(post) {
      function okay() {
        this.send(async () => {
          await this.model.delete(post.id);         
          bus.dispatch('post-deleted', { post });
        });
      }

      bus.dispatch('alert-warning', { 
        message: 'It cannot be restored in the future',
        okay: okay.bind(this) 
      });
    },

    contextEdit(post) {
      bus.dispatch('post-editing', { post }),
      this.onSelected({ post });
    }
  }
}
</script>