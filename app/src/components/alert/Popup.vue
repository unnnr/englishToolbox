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
				let message = 
					typeof event.message === 'string' ? event.message : '';

				Object.assign(this, {
					type: 'error',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message,
				});

				Object.assign(this.$options, {
					okay: event.okay,
				});
			},
			
			'alert-warning': event => {
				let message = 
					typeof event.message === 'string' ? event.message : '';

				Object.assign(this, {
					type: 'warning',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message,
				});
				
				Object.assign(this.$options, {
					okay: event.okay,
					cancel: event.cancel
				});
			},

			'alert-prompt': event => {
				let message = 
					typeof event.message === 'string' ? event.message : '';

				Object.assign(this, {
					type: 'prompt',
					shown: true,
					// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP 
					message,
				}),
				
				Object.assign(this.$options, {
					confirm: event.confirm,
					cancel: event.cancel
				});
			},
		});
	}, 

	methods: {
		fire(eventName, args) {
			if (typeof this.$options[eventName] !== 'function')
					return;

			this.$options[eventName](args);
			this.$options[eventName] = null;
		},

		okay() {
			this.fire('okay');
			this.shown = false;
		},

		cancel() {
			this.fire('cancel');
			this.shown = false;
		},
		
		confirm() {
			this.fire('confirm');
			this.shown = false;
		},

		confirmInput(event) {
			this.fire('confirm', event.entry)
			this.shown = false;
		}
	}
}
</script>