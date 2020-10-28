
import bus from '@services/eventbus'

const HandlePostSelection = {
	methods: {
		select(post) {
			if (this.$options.selectedPost)
				this.$set(this.$options.selectedPost, 'selected', false)

			this.$options.selectedPost = post;
			this.$set(post, 'selected', true)
		}
	}
}

export default HandlePostSelection;