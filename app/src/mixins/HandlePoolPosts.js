const HandlePoolPosts = {
  data() {
    return {
      paginationPosition: 0,
      paginationStep: 6,
      parsedPosts: [],
    }
  },

  computed: {
    reversed() {
      console.log('reversing');

      return [...this.posts].reverse();
    },

    filtered() {
      console.log('filtering');

      return this.reversed;
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
    movePagination() {
      let postion = this.paginationPosition;
      if (postion < this.chunked.length)
        this.paginationPosition++;
    }
  }
}

export default HandlePoolPosts;