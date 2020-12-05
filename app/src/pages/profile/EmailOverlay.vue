<template>
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
					If you have troubles, click to <br>
					<u>change your mail</u>, or <u>resend verification mail</u>
				</p>

				<code-input
					v-model="entry"
					@confirm="request"/>

				<button 
					class="register-overlay__confirm-button button-secondary" 
					:disabled="loading"
					@click.prevent="request">
					
					confirm
				</button>

			</div>
		</transition>

	</section> 
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
		request() {
			if (this.entry.length < 4)
				return;

			this.send(this.verify.bind(this));
		},	

		async load() {
			let user = await Auth.user.get();

			this.verified = user.verified;
			this.loaded = true;
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