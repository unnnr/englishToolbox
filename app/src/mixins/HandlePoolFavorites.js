import Favorites from '@models/Favorites'

const HandlePoolFavorites = {
  data() {
    return {
      favorites: []
    }
  },

  methods: {
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
  }
}

export default HandlePoolFavorites;