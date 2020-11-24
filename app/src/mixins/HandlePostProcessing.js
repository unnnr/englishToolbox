const HandlePostProcessing= {
	props: {
		editing: { type: Boolean, default: false },

		request: { type: Function, default: null },
	
		deleting: {type: Function, default: null }
	},

	inject: [ '$target' ],

	computed: {
		target() {
		  return this.$target();
		},
	
		withDefault() {
		  return this.target && this.editing;
		}
	},

	methods: {
		hasChanges() {
      let form = this.$refs.form;

      return form.hasChanges();
		},
		
		prepareDeletion() {
			function okay() {
				form.sendWith(async () => {
					await this.deletePost();
					await this.afterDeletion();
				});
			}

			if (typeof this.deleting !== 'function')
				return;

			let form = this.$refs.form;
			if (!!!form)
				return;

			bus.dispatch('alert-warning', { 
				message: 'It cannot be restored in the future',
				okay: okay.bind(this)
			})
		},

		async deletePost() {
			if (typeof this.deleting !== 'function')
				return;

			await this.deleting(this.target)
		},

		async afterDeletion() {
			bus.dispatch('post-deleted', { 
				post: this.target
		 	})
		}
	}
}

export default HandlePostProcessing;