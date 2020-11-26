<template>
	<transition  name="fade">
		<section 
			class="modal container"
			v-if="shown">

      <prompt-alert
        v-if="prompt"
        :message="message"
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

  	</section> 
	</transition>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import WarningAlert from '@components/popups/WarningAlert'
import PromptAlert from '@components/popups/PromptAlert'
import ErrorAlert from '@components/popups/ErrorAlert'
import bus from '@services/eventbus'

export default {
  components: {
    WarningAlert, 
    PromptAlert,
    ErrorAlert
  },

	mixins: [ HandleEvents ],

	data() {
		return {
			type: null,
			message: null
		}   
	},

	computed: {
		prompt() {
			return this.type === 'prompt';
		},

		warning() {
			return this.type === 'warning';
    },
    
    error() {
      return this.type === 'error';
    },
    
    shown() {
      return this.error || this.warning || this.prompt;
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
		});
	}, 

	methods: {
		preventIfScroll(event) {
			var keys = {37: 1, 38: 1, 39: 1, 40: 1};

			if (keys[event.keyCode])
				event.preventDefault();
		},

		prevent(event) {
			event.preventDefault();
		},

		lockScroll() {
			window.addEventListener('wheel', this.prevent, { passive: false });
			window.addEventListener('scroll', this.prevent, { passive: false });
			window.addEventListener('touchmove', this.prevent);
			window.addEventListener('keydown', this.preventIfScroll);
		},

		unlockScroll() {
			window.removeEventListener('wheel', this.prevent, { passive: false });
			window.removeEventListener('scroll', this.prevent, { passive: false });
			window.removeEventListener('touchmove', this.prevent);
			window.removeEventListener('keydown', this.preventIfScroll);
		},

    prepareAlert(event) {
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