<template>
	<form
		ref="form"
		action="#"
		@submit.prevent="send">

		<slot></slot>
	</form>
</template>

<script>
export default {
	data: function() {
		return {
			loading: false
		}
	},

	props: {
		submitCallback: {
			type: Function, 
			default: () => {}
		}
	},

	methods: {
		handleError(error) {
			if (error.status == 422)
			{
				let errors = error.body.errors;

				this.$emit('input:incorrect', errors);
				return;
			}

			throw error;
		},

		getData() {
			return new FormData(this.$refs.form);
		},

		clear() {
			this.$refs.form.reset();
		},

		async send() {
			if (this.loading)
				return;
			
			this.loading = true;

			try {
				if (this.submitCallback)
					await this.submitCallback(this.getData());

				this.loading = false;
			}
			catch (error) {
				this.loading = false;

				this.handleError(error);
			}
		}
	}
}
</script>