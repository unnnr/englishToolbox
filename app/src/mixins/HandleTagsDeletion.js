const HandleTagsDeletion = {
	data() {
		return {
			emptyTag: {
				label: '#9$a%er0',
				color: 'lightgray',
				default: true,
				id: -1
			}
		}
	},

	methods: {
		removeTagFromPost(tag, post) {
			let id = tag.id;

			let tags = post.tags;
      for (let tag of tags) {
        if (tag.id !== id)
          continue;

        let index = tags.indexOf(tag);
        tags.splice(index, 1);
      }
      
      let mainTag = post.mainTag;
      if (mainTag.id === id)
				post.mainTag = this.emptyTag;
		}
	}
}

export default HandleTagsDeletion;