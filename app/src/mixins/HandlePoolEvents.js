import { throttle } from 'throttle-debounce';
import HandleEvents from '@mixins/HandleEvents'
import bus from '@services/eventbus'

const HandlePoolEvents = {
  mixins: [ HandleEvents ],

  mounted() {
    // Attaching throttled scroll event
    this.$options.scrollEvent = 
      throttle(200, this.onScroll);
    
    document.addEventListener('scroll', 
      this.$options.scrollEvent)

    // Initialising bus events
    this.listen({
      'post-selected': this.onSelected,
      'post-creating': this.onCreating,
      'post-created': this.onCreated,
      'post-deleted': this.onDeleted,
      'post-edited': this.onEdited,
      'tag-deleted': this.onTagDeleted
    });
  },

  beforeDestroy() {
    document.removeEventListener('scroll', 
      this.$options.scrollEvent)
  },

  methods: {
    createNew() {
      bus.dispatch('post-start-creating');
    },

    trySelect(post) {
      // Preventing redundunt requests
      if (post
        && this.$options.selectedPost 
        && this.$options.selectedPost.id === post.id)
        return;
      
      bus.dispatch('post-selecting', { post });
    },

    onSelected(event) {
      let post = null;

      if (event.post)
        post = this.findById(event.post.id);
  
      this.select(post);
    },

    needToPaginate() {
      let pool = this.$refs.pool.$el;
      if (!!!pool)
        return;

      const OFFSET = 100;
    
      let viewportHeight = window.innerHeight;
      let lastCard = pool.lastElementChild;
      let bottom = lastCard.getBoundingClientRect().bottom;

      return bottom - OFFSET > viewportHeight;
    },

    onScroll() {
      if (this.needToPaginate())
        this.movePagination();
    },

    onCreating() {
      this.select(null);
    },

    onCreated(event) {
			let post = event.post;

      this.posts.push(post);
      this.reversedPosts.unshift(post);
      this.parsedPosts.unshift(post);

		  bus.dispatch('post-selecting', { 
        post, withoutAlert: true,
      });
    },
    
    onEdited(event) {
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
    
    onDeleted(event) {
      let deletedPost = event.post;
      let post = this.findById(deletedPost.id);
			let index = this.posts.indexOf(post);
				
			if (index === -1)
				return;
			
			// If removed post was selected, we need select another
			let removedPost = this.posts.splice(index, 1)[0];
      if (!!!this.$options.selectedPost)
        return;
       
			if(removedPost.id === this.$options.selectedPost.id)
        this.selectFirst();
    },

    onTagDeleted(event) {
      let tag = event.tag;

      for (let post of this.posts)
        this.removeTagFromPost(tag, post);
    },
  }
}

export default HandlePoolEvents;