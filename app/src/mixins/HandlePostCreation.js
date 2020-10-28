import bus from '@services/eventbus'

const HandlePostCreation = {
	methods: {
		async onCreated({ post }) {
			console.log('some');
			this.posts.push(post);
			this.select(post);
		}
	}
}

export default HandlePostCreation;