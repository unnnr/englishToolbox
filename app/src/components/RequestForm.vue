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
	props: {
		submitCallback: {
			type: Function, 
			default: () => {}
		},

		defaults: {
			type: Object,
			default: () => {}
		}
	},

	data: function() {
		return {
			loading: false
		}
	},

	computed: {
		data() {
			let data = new FormData(this.$refs.form);

			return this.clearData(data);
		},
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

		clearData(data) {
			for (let [field, value] of data.entries())
			{
				console.log(this.defaults[field], value);

				if (value === this.defaults[field])
					data.delete(field)
			}
			

			return data;
		},

		clear() {
			this.$refs.form.reset();
		},

		async send() {
			if (this.loading)
				return;
			
			//this.loading = true;
			
			this.data;

			return;	
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