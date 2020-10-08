<template>
	<transition 
		name="fade">
		
		<section 
			class="modal modal-alert container"
			v-if="shown">

			<alert 
        :warnign="warning"
        :prompt="prompt"
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

	data: function() {
		return {
			shown: false,

			message: '',

			prompt: false,
			warning: false,
		}   
	},

	mounted() {
		this.listen({
			'alert-error': event => {
				Object.assign(this, {
					shown: true,

					prompt: false,
					warning: false,

					message:  event.message,
				});

				Object.assign(this.$options, {
					okay: event.onOkay,
				});
			},
			
			'alert-confirm': event => {
				Object.assign(this, {
					shown: true,
					
					warning: true,
					prompt: false,

					message: event.message,
				});

				Object.assign(this.$options, {
					confirm: event.onConfirm,
					cancel: event.onCancel
				});
			},

			'alert-prompt': event => {	
				Object.assign(this, {
					shown: true,

					prompt: true, 
					warning:false,

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
				this.$options.confirm(event.input);
				this.$options.confirm = null;
			}
				
			this.shown = false;
		}
	}
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}	

</style>