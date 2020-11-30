<template>
  <pool 
    ref="pool"
    class="container"

    :can-create="canCreate"
    :context="createContext"
    :cards="parsedPosts"

    @favorite-toggle="toggleFavorite"
    @create-new="createNew"
    @select="trySelect"/>
</template>

<script>
import { throttle } from 'throttle-debounce';
import HandlePoolFavorites from '@mixins/HandlePoolFavorites'
import HandleTagsDeletion from '@mixins/HandleTagsDeletion'
import HandlePoolContext from '@mixins/HandlePoolContext'
import HandlePoolEvents from '@mixins/HandlePoolEvents'
import HandleRequests from '@mixins/HandleRequests'
import Pool from '@components/cards_new/Pool'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

export default {
  components: {
    Pool
  },

  mixins: [ 
    HandlePoolFavorites,
    HandleTagsDeletion,
    HandlePoolContext,
    HandlePoolEvents,
    HandleRequests
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
  },

  methods: {
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

    trySelect(post) {
      // Preventing redundunt requests
      if (post
        && this.$options.selectedPost 
        && this.$options.selectedPost.id === post.id)
        return;
      
      bus.dispatch('post-selecting', { post });
    },

    selectFirst() {
      if (this.firstPost)
        this.trySelect(this.firstPost);
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
  
      this.parsePosts();

      let id = parseInt(this.$route.params.id);
      let post = this.findById(id);

      if (post)
        this.trySelect(post);
      else
        this.selectFirst();
    },

    async loadUser() {
      let authenticated = await Auth.check();

      if (!!!authenticated)
        return;

      this.favorites = await this.model.favorites();
      this.authenticated = true;

      if (this.posts.length > 0)
        this.parseFavorites();
    }
  } 
}
</script>