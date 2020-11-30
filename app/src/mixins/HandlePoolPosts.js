const HandlePoolPosts = {
  data() {
    return {
      paginationPosition: 0,
      paginationStep: 6,

      parsedPosts: [],
      filters: [ {id: 8} ],
    }
  },

  computed: {
    reversed() {
      console.log('reversing');

      return [...this.posts].reverse();
    },

    filtered() {
      console.log('filtering');

      let filters = this.filters;
      let posts = this.reversed;

      if (filters.length === 0)
        return posts;

      let filtered = [];
      for (let filter of filters) {
        for (let post of posts) {
          if (this.postHasTag(post, filter))
            filtered.push(post);
        } 
      }

      return filtered;
    },

    chunked() {
      console.log('chunking');

      let chunked = [];
      let posts = this.filtered;
      let step = this.paginationStep;

      for (let i = 0; i < posts.length; i += step){
        chunked.push(posts.slice(i, i + step));}

      return chunked;
    },

    parsed() {
      console.log('parsing');

      let chunked = this.chunked;
      let parsed = [];

      let to = this.paginationPosition
      if (to >= chunked.length)
        to = this.chunked.length - 1;

      for (let i = 0; i <= to; i++)
        parsed.push(...chunked[i]);


      return parsed;
    }
  },

  methods: {
    postHasTag(post, tag) {
      let filter = tag.id;
      
      let mainTag = post.mainTag;
      if (mainTag.id === filter)
        return true;
      
      let tags = post.tags;
      for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        
        if (tag.id === filter)
          return true;
      }

      return false;
    },

    movePagination() {
      let postion = this.paginationPosition;
      if (postion < this.chunked.length)
        this.paginationPosition++;
    }
  }
}

export default HandlePoolPosts;