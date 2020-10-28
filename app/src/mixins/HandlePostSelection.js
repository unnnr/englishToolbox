
import bus from '@services/eventbus'

const HandlePostSelection = {
	methods: {
		select(post) {
			// Unselecting previos post
			if (this.$options.selectedPost)
				this.$set(this.$options.selectedPost, 'selected', false)

			// Selecting current post
			this.$options.selectedPost = post;
			this.$set(post, 'selected', true)

			// Emitting event
			bus.dispatch('post-selectiong');
		}
	}
}

export default HandlePostSelection;