<template>
  <section class="favorites container">
    <h3 class="favorites__title heading-third">Favorite list</h3>
    <pool 
      :cards="favorites"
      :context="createContext"
      @favorite-toggle="unfavorite"/>
  </section>
</template>

<script>
import HandleRequests from '@mixins/HandleRequests'
import Favorites from '@models/Favorites'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    Pool
  },

  mixins: [ HandleRequests ],

  data() {
    return {
      favorites: []  
    }
  },

  beforeMount() {
    this.loadPosts();
  },

  methods: {
    createContext() {
      return () => ({
        'Unfavorite': () => {

        }
      });
    },

    remove() {

    },

    unfavorite(post) {
      this.send(() => {
        // await .unfavorite(post.id);
      });
    },

    async loadPosts() {
      let posts = await Favorites.all();
      
      for (let post of posts) {
        post.favorite = true;
      }

      this.favorites = posts;
    },
  }
}
</script>