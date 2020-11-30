const HandlePoolPosts = {
  methods: {
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
  }
}

export default HandlePoolPosts;