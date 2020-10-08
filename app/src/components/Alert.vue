<template>
	<transition 
		name="fade">
		
		<section 
			class="modal modal-alert container"
			v-if="shown">

			<div
				class="alert alert--prompt"
				:class="alertType">

				<span class="alert__header text-second"></span>
				<p class="alert__description text-fifth">{{ message }}</p>
				<input
					v-if="prompt"
					class="alert-input input-second"
					type="password"
					placeholder="">

				<div class="alert__buttons">
					<button 
						class="alert__button alert__button--cancel"
						@click="cancel">

						cancel
					</button>
					<button
						class="alert__button alert__button--confirm"
						@click="confirm">

						Confirm
					</button>
					<button 
						class="alert__button alert__button--okay"
						@click="okay">

						got it
					</button>
				</div>
			</div> 
		</section>
	</transition>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import bus from '@services/eventbus'

const DEFAULT_MESSAGE = `An unexpected error has occurred. Please try again later`;

export default {

	mixins: [ HandleEvents ],

	data: function() {
		return {
			shown: true,

			warning: false,
			message: '',

			prompt: true,
			input: ''
		}   
	},

	computed: {
		alertType() {
			if (this.warning)
				return 'alert--warning';

			if (this.prompt)
				return 'alert--prompt';

			return 'alert--error';
		}
	},

	mounted() {

		this.listen({
			'alert-error': event => {
				Object.assign(this, {
					message: event.message || DEFAULT_MESSAGE,
					warning: false,
					shown: true
				});
			},
			
			'alert-confirm': event => {
				Object.assign(this, {
					message: event.message || DEFAULT_MESSAGE,
					warning: true,
					shown: true,

					$options: {
						confirm: event.onConfirm,
						cancel: event.onCancel
					}
				});
			},

			'alert-prompt': event => {
				Object.assign(this, {
					
				})
			}

		});
		bus.listen();

		bus.listen();
	},

	methods: {
		cancel() {
			if (!!!this.warning)
				return;

			if (this.$options.cancel)
			{
				this.$options.cancel();
				this.$options.cancel = null;
			}
			
			this.shown = false;
		},

		confirm() {
			if (!!!this.warning)
				return;

			if (this.$options.confirm)
			{	
				this.$options.confirm();
				this.$options.confirm = null;
			}
			
			this.shown = false;
		},

		okay() {
			if (!!!this.warning)
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