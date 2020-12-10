<template>
	<transition name="fade">
		<section 
			class="register-overlay"
			v-if="shown">

			<transition name="fade">
				<div 
					class="register-overlay__body"
					v-if="loaded">

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
						:keysCount="keysCount"
						@confirm="onConfirm"/>

					<button 
						class="register-overlay__confirm-button button-secondary" 
						:disabled="disabled"
						@click.prevent="request">
						
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
			
			verified: false,
			loaded: false,
		}
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/overlay-confirm.svg';
		},

		shown() {
			return !!!this.verified || !!!this.loaded;
		},

		disabled() {
			return this.loading || this.entry.length !== this.keysCount;
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
			this.send(this.resend, this.handleError);
		},

		async load() {
			let user = await Auth.user.get();

			this.verified = user && user.verified;
			this.loaded = true;
			this.email = user.email;
		},

		async resend() {
			await Auth.resendCode();
		},

		async changeMail() {

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