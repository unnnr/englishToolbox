const HandlePostEditing = {
	methods: {
		async onEdited(event) {
			let target = event.post;
			let post = this.findById(target.id);
				
			console.log(target.id);
			if (post === null)
				return;
			console.log(123);
			Object.assign(post, target);
		},

		findById(id) {
			for (let post of this.posts)
			{
				if (post.id ===  id)
					return post
			}

			return null;
		}
	}
}

export default HandlePostEditing;