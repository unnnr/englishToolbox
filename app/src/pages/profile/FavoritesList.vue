<template>
  <section class="favorites container">
    <h3 class="favorites__title heading-third">Favorite list</h3>

    <transition name="fade" mode="out-in">
      <div key="overlay" v-if="empty" class="pool">
        <div class="card card--favorites">
          <div 
            class="card__image "
            :style="{'background-image': overlaySrc}">
          </div>
        </div>
      </div>
      
      <pool
        v-else
        :cards="posts"
        :context="createContext"

        square-cards
        @favorite-toggle="unfavorite"
        @select="goToPost"/>
    </transition>
    
  </section>
</template>

<script>
// services
import PostLinks from '@services/PostLinks'
import Favorites from '@models/Favorites'

// mixins
import HandleRequests from '@mixins/HandleRequests'

// components
import FormatedDate from '@services/FormatedDate'
import Pool from '@components/cards/Pool'


export default {
  components: {
    Pool
  },

  mixins: [ HandleRequests ],

  data() {
    return {
      favorites: [],
      overlay: 'img/svg/overlay-favorites.svg'
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
    },

    empty() {
      return !!!this.posts.length;
    },

    overlaySrc() {
      return 'url(' + this.overlay + ')';
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

    find(id) {
      for (let favorite of this.favorites) {
        if (id !== favorite.post.id)
          continue;

        return favorite;
      }

      return null;
    },

    goToPost(post) {
      let favorite = this.find(post.id);
      if (favorite === null)
        return;

      let type = favorite.postType;
      let id = favorite.post.id;

      let path = PostLinks.generate(type, id);
			this.$router.push({ path });
    },

    unfavorite(post) {
      this.send(async () => {
        // Searching for removing post
        let removedFavorite = this.find(post.id);
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
      this.favorites = await Favorites.all();
    },
  }
}
</script>