<template>
  <section class="favorites container">
    <h3 class="favorites__title heading-third">Favorite list</h3>


    <pool 
      :cards="posts"
      :context="createContext"
      square-cards
      @favorite-toggle="unfavorite"/>
  </section>
</template>

<script>
import HandleRequests from '@mixins/HandleRequests'
import FormatedDate from '@services/FormatedDate'
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

  computed: {
    posts() {
      let posts = [];
      for (let favorite of this.favorites) {
        let post = favorite.post;
        post.createdAt = FormatedDate.parse(post.createdAt);
        post.favorite = true;
        posts.push(post);
      }

      return posts;
    }
  },

  beforeMount() {
    this.loadPosts();
  },

  methods: {
    createContext(post) {
      return () => ({
        'Unfavorite': 
          () => this.unfavorite(post)
      });
    },

    remove() {

    },

    unfavorite(post) {
      this.send(async () => {
        // Searching for removing post
        let removedFavorite = null;
        for (let favorite of this.favorites)
        {
          if (post.id !== favorite.post.id)
            continue;

          removedFavorite = favorite;
          break;
        }
        
        if (removedFavorite === null)
          return;
        
        // Sending 
        await Favorites.delete(removedFavorite.id);

        //Removing
        let index = this.favorites.indexOf(removedFavorite);
        this.favorites.splice(index, 1)
      });
    },

    async loadPosts() {
      this.favorites = await Favorites.all();;
    },
  }
}
</script>