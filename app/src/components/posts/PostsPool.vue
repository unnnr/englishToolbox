<template>
  <pool 
    ref="pool"
    class="container"

    :can-create="canCreate"
    :context="createContext"
    :cards="parsed"

    @favorite-toggle="toggleFavorite"
    @create-new="createNew"
    @select="trySelect"/>
</template>

<script>
import HandlePoolFavorites from '@mixins/HandlePoolFavorites'
import HandleTagsDeletion from '@mixins/HandleTagsDeletion'
import HandlePoolContext from '@mixins/HandlePoolContext'
import HandlePoolEvents from '@mixins/HandlePoolEvents'
import HandlePoolPosts from '@mixins/HandlePoolPosts'
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
    HandlePoolPosts,
    HandleRequests
  ],

  inject: [ 'model' ],

  data() {
    return {
      paginationStep: 6,

      posts: [],
      
      authenticated: false,
      canCreate: true,
    }
  },

  computed: {
    firstPost() {
      return this.parsed[0];
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

        this.$router.replace({ params: { id: post.id} })
          .catch(() => null);
      }
    },

    selectFirst() {
      if (this.firstPost)
        this.trySelect(this.firstPost);
    },

    async loadPosts() {
      this.posts = await this.model.all();
      
      // Favorites
      if (this.favorites.length > 0)
        this.parseFavorites();

      // Selecting post from uri or simply first
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