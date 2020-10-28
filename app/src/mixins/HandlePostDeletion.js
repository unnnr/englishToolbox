import bus from '@services/eventbus'

const HandlePostDeletion = {
	methods: {
		async onDeleted(event) {
			let deletedPost = event.post;
			let index = this.postIndex(deletedPost.id);
				
			if (index === null)
				return;
			
			// If removed post was selected, we need select another
			let removedPost = this.posts.splice(index, 1)[0];

			if (this.$options.selectedPost 
					&& removedPost.id === this.$options.selectedPost.id)
				this.select(this.firstPost);
		},

		findById(id) {
			for (let post of this.posts)
			{
				if (post.id ===  id)
					return post
			}

			return null;
		},

		postIndex(id) {
			for (let i = 0; i < this.posts.length; i++)
			{
				let post = this.posts[i];

				if (post.id ===  id)
					return i
			}

			return null;
		}
	}
}

export default HandlePostDeletion;