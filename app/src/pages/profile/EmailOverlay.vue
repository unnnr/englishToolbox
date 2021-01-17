<template>
	<transition name="fade">
		<section 
			class="register-overlay"
			v-if="shown">

			<transition name="fade">
				<div 
					class="register-overlay__body"
					v-if="authenticated">

					<img 
						class="register-overlay__image"
						:src="imageUrl" 
						alt="#">

					<p class="register-overlay__hint register-overlay__hint--error-s text-fourth">
						Code sent to <span>{{ email }}</span> <br>
						If you have troubles, click to <br>
						
						<u @click="onChanging">change your mail</u>, or 
						
						<u @click="onResend">resend verification mail</u>
					</p>

					<code-input
						v-model="entry"
						:disabled="inputDisabled"
						:keysCount="keysCount"
						@confirm="onConfirm"/>

					<button 
						class="register-overlay__confirm-button button-secondary" 
						:disabled="buttonDisabled"
						@click.prevent="onConfirm">
						
						confirm
					</button>

				</div>
			</transition>

		</section> 
	</transition>
</template>

<script>
import HandleScrollLock from '@mixins/HandleScrollLock'
import HandleRequests from '@mixins/HandleRequests'
import CodeInput from '@components/inputs/CodeInput'
import Auth from  '@services/Auth';

export default {
	components: {
		CodeInput
	},

	mixins: [ 
		HandleScrollLock,
		HandleRequests
	],

	data() {
		return {
			email: null,
			keysCount: 4,
			entry: '',
			
			authenticated: false,
			changingMail: false,
			verified: false,
		}
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/overlay-confirm.svg';
		},

		shown() {
			return !!!this.verified && this.authenticated && this.email !== null;
		},

		buttonDisabled() {
			return this.loading || this.entry.length !== this.keysCount;
		},

		inputDisabled() {
			return this.loading || this.changingMail;
		}
	},

	watch: {
		shown: {
			handler(value) {
				if (value)
					this.lockScroll();
				else
					this.unlockScroll();
			},

			immediate: true
		}
	},

	beforeMount() {
		this.load();
	},

	beforeDestroy() {
		this.unlockScroll();
	},

	methods: {
		handleError(raw, parsed) {
			let status = raw.status;

			if (status === 400)
				return raw.body.message;

			if (status === 422)
				return parsed.code;

			return null;
		},

		onConfirm() {
			if (this.disabled)
				return;

			this.send(this.verify, this.handleError);
		},
		
		onResend() {
			this.send(this.resend, this.handleError);
		},

		onChanging() {
			this.changingMail = true;

			bus.dispatch('alert-prompt', {
				message: 'Write here your new email',
				type: 'email',
				visible: true,
				
				cancel: async () => {
					this.changingMail = false;
					
					await this.$nextTick();
					this.lockScroll();
				},

				confirm: async (email) => {
					this.send(
						() => 
							this.changeMail(email),

						raw => {
							if (raw.status === 422)
								return 'Please enter a valid email address';
						}
					);
					
					this.changingMail = false;

					await this.$nextTick();
					this.lockScroll();
				}
			});
		},

		async load() {
			this.authenticated = await Auth.check();
			if (!!!this.authenticated)
				return;

			let user = await Auth.user.get();

			this.verified = user && user.verified;
			this.email = user.email;
		},

		async resend() {
			await Auth.resendCode();
		},

		async changeMail(email) {
			await Auth.resendCode(email);

			this.email = email;
		},


		async verify() {
			let data = new FormData();
			data.append('code', this.entry);

			await Auth.verifyEmail(data);
			this.verified = true;
		}
	}
}
</script>