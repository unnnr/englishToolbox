<template>
	<form
		ref="form"
		action="#"
		@submit.prevent="send">

		<slot @hook:mounted="test"></slot>
	</form>
</template>

<script>
export default {
	props: {
		submitCallback: {
			type: Function, 
			default: () => {}
		}
	},

	data: function() {
		return {
			loading: false
		}
	},

	computed: {
		data: {
			cache: false,
			get() {
				return new FormData(this.$refs.form);
			}
		}
	},

	methods: {
		handleError(error) {
			if (error && typeof error == 'object' && error.status == 422)
			{
				let errors =  error.body.errors;

				for (let key in errors)
					errors[key] = errors[key].join(', ');

				this.$emit('input:incorrect', errors);
				
				return;
			}

			throw error;
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
					await this.submitCallback(this.data);

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