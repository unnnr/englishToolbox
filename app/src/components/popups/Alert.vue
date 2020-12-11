<template>
	<transition name="fade">
		<section 
			class="modal container"
			v-if="shown"
			@click.self="cancel">

      <prompt-alert
        v-if="prompt"
        :message="message"
				:type="promptType"
        @confirm="confirmInput"
        @cancel="cancel"/>

      <warning-alert
        v-if="warning"
        :message="message"
        @cancel="cancel"
        @okay="okay"/>

      <error-alert
        v-if="error"
        :message="message"
        @okay="okay"/>

			<guest-alert
				v-if="guest"
				@okay="okay"
				@cancel="cancel"/>

			<recovery-alert
				v-if="recovery"
				@close="cancel"/>

  	</section> 
	</transition>
</template>

<script>
// mixins
import HandleScrollLock from '@mixins/HandleScrollLock'
import HandleEvents from '@mixins/HandleEvents'

// services
import bus from '@services/eventbus'

// components
import RecoveryAlert from '@components/popups/RecoveryAlert.vue'
import WarningAlert from '@components/popups/WarningAlert'
import PromptAlert from '@components/popups/PromptAlert'
import ErrorAlert from '@components/popups/ErrorAlert'
import GuestAlert from '@components/popups/GuestAlert'


export default {
  components: {
    RecoveryAlert,
    WarningAlert, 
    PromptAlert,
    ErrorAlert,
    GuestAlert,
  },

	mixins: [ 
		HandleScrollLock,
		HandleEvents
	],

	data() {
		return {
			type: null,
			message: null,
			promptType: null,
			recoveryEmail: null
		}   
	},

	computed: {
		guest() {
			return this.type === 'guest';
		},

		error() {
      return this.type === 'error';
    },

		prompt() {
			return this.type === 'prompt';
		},

		warning() {
			return this.type === 'warning';
		},
		
		recovery() {
			return this.type === 'recovery';
		},
    
    shown() {
			return this.error 
					|| this.recovery
					|| this.warning
					|| this.prompt
					|| this.guest;
    }
	},

	watch: {
		shown(value) {
			if (value)
				this.lockScroll();
			else 
				this.unlockScroll();
		}
	},

	mounted() {
		this.listen({
			'alert-error': event => {
        this.prepareAlert(event);
        this.type = 'error';
			},
			
			'alert-warning': event => {
        this.prepareAlert(event);
				this.type = 'warning';

			},

			'alert-prompt': event => {
        this.prepareAlert(event);
				this.type = 'prompt';
			},

			'alert-guest': event => {
				this.prepareAlert(event);
				this.type = 'guest';
			},

			'alert-recovery': event => {
				this.prepareAlert(event);
				this.type = 'recovery';
			}
		});
	}, 

	methods: {
    prepareAlert(event) {
			this.promptType = 
				event.type || 'password';

			this.recoveryEmail = 
				event.email;

      this.message = typeof event.message === 'string' ? 
        event.message : '';
      
      Object.assign(this.$options, {
				confirm: event.confirm,
        cancel: event.cancel,
				okay: event.okay,
			});
    },

		fire(eventName, args) {
			if (typeof this.$options[eventName] !== 'function')
					return;

			this.$options[eventName](args);
			this.$options[eventName] = null;
		},

    hide() {
      this.type = null;
    },

		okay() {
			this.hide();
			this.fire('okay');
		},

		cancel() {
			this.hide();
			this.fire('cancel');
		},
		
		confirm() {
			this.hide();
			this.fire('confirm');
		},

		confirmInput(event) {
			this.hide();
			this.fire('confirm', event.entry)
    },
	}
}
</script>