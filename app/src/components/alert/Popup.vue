<template>
	<transition  name="fade">
		<section 
			class="modal container"
			v-if="shown" >
     
			<alert 
        :warning="warning"
        :prompt="prompt"
				:message="message"
				
				@confirm-prompt="confirmInput"
				@confirm="confirm"
				@cancel="cancel"
				@okay="okay"
				prompt-dotten/>

  	</section> 
	</transition>
</template>

<script>

import Alert from '@components/alert/Alert'
import HandleEvents from '@mixins/HandleEvents'
import bus from '@services/eventbus'

export default {
	components: { Alert },

	mixins: [ HandleEvents ],

	data() {
		return {
			shown: false,
			type: 'error',
			message: '',
		}   
	},

	computed: {
		prompt() {
			return this.type === 'prompt';
		},

		warning() {
			return this.type === 'warning';
		}
	},

	mounted() {
		this.listen({
			'alert-error': event => {
				Object.assign(this, {
					type: 'error',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message:  event.message,
				});

				Object.assign(this.$options, {
					okay: event.onOkay,
				});
			},
			
			'alert-warning': event => {
				Object.assign(this, {
					type: 'warning',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message: event.message,
				});

				Object.assign(this.$options, {
					confirm: event.onConfirm,
					cancel: event.onCancel
				});
			},

			'alert-prompt': event => {	
				Object.assign(this, {
					type: 'prompt',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message: event.message,
				}),
				
				Object.assign(this.$options, {
					confirm: event.onConfirm,
					cancel: event.onCancel
				});
			},
		});
	}, 

	methods: {
		okay() {
			if (this.$options.okay)
			{
				this.$options.okay();
				this.$options = null;
			}

			this.shown = false;
		},

		cancel() {
			if (this.$options.cancel)
			{
				this.$options.cancel();
				this.$options = null;
			}

			this.shown = false;
		},
		
		confirm(some) {
			if (this.$options.confirm)
			{	
				this.$options.confirm();
				this.$options.confirm = null;
			}

			this.shown = false;
		},

		confirmInput(event) {
			console.log(event);
			if (this.$options.confirm)
			{
				this.$options.confirm(event.entry);
				this.$options.confirm = null;
			}
				
			this.shown = false;
		}
	}
}
</script>