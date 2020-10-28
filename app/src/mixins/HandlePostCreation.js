import bus from '@services/eventbus'

const HandlePostCreation = {
	methods: {
		async onCreated(event) {
			let post = event.post;
			
			this.posts.push(post);
			this.select(post);
		}
	}
}

export default HandlePostCreation;