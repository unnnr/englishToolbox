import bus from '@services/eventbus'

const HandlePoolContext = {
  methods: {
    createContext(post) {
			return () => {
				let context = {};
				// Guest context
				context['Open'] = 
					() => this.contextSelect(post);

				if (!!!this.authenticated)
					return context;

				// User context
				context[post.favorite ? 'Unfavorite' : 'Favorite'] = 
					() => this.contextFavorite(post)
				
				if (!!!this.canCreate)
					return context;

				// Admit context
				context['Edit'] = 
					() => this.contextEdit(post);

				context['Delete'] = 
					() => this.contextDelete(post)

				return context;
			}
		}, 

		contextSelect(post) {
			this.trySelect(post)
		},

		contextFavorite(post) {
			this.this.toggleFavorite(post);
		},

		contextDelete(post) {
      function okay() {
        this.send(async () => {
          await this.model.delete(post.id);         
          bus.dispatch('post-deleted', { post });
        });
      }

      bus.dispatch('alert-warning', { 
        message: 'It cannot be restored in the future',
        okay: okay.bind(this) 
      });
    },

    contextEdit(post) {
      bus.dispatch('post-editing', { post }),
			this.select(post);
    }
	}
}

export default HandlePoolContext;