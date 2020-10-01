<template>
	<transition 
		name="fade">
		
		<section 
			class="modal modal-alert container"
			v-if="shown">

			<div
				class="alert"
				:class="alertType">

				<span class="alert__header text-second"></span>
				<p class="alert__description text-fifth">{{ message }}</p>
				<input class="alert-input input-second" type="password" placeholder="">

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

import bus from '@services/eventbus';

const DEFAULT_MESSAGE = `An unexpected error has occurred. Please try again later`;

export default {
	data: function() {
		return {
			message: '',
			shown: false,
			warning: true,
			alertShown: false
		}   
	},

	computed: {
		alertType() {
			if (this.warning)
				return 'alert--warning';
			return 'alert--error';
		}
	},

	mounted() {
		bus.listen('alert-error', (event) => {
			this.message = event.message || DEFAULT_MESSAGE;
			this.warning = false;
			this.shown = true;
		});

		bus.listen('alert-confirm', (event) => {
			this.message = event.message;
			this.callbacks.confirme = event.onConfirm;
			this.callbacks.cancel = event.onCancel;

			this.warning = true;
			this.shown = true;
		});

		this.callbacks = [];
	},

	methods: {
		cancel() {
			if (!!!this.warning)
				return;

			if (this.callbacks.cancel)
				this.callbacks.cancel();
			
			this.callbacks.cancel = null;
			this.shown = false;
		},

		confirm() {
			if (!!!this.warning)
				return;

			if (this.callbacks.confirme)
				this.callbacks.confirme();
			
			this.callbacks.confirme = null;
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