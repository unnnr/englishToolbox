<template>
	<section 
		class="register-overlay"
		v-if="shown">

		<transition name="fade">
			<div 
				class="register-overlay__body"
				v-if="loaded">

				<object
					class="register-overlay__image"
					type="image/svg+xml"
					:data="imageUrl">
				</object>
				
				<p class="register-overlay__hint register-overlay__hint--error text-fourth">
					<!-- Enter your code here:  -->
					Your code is invalid, please try again:
				</p>

				<div class="register-overlay__input-group">
					<input class="register-overlay__input" maxlength="1" placeholder="-">
					<input class="register-overlay__input" maxlength="1" placeholder="-">
					<input class="register-overlay__input" maxlength="1" placeholder="-">
					<input class="register-overlay__input" maxlength="1" placeholder="-">
				</div>

				<button class="register-overlay__confirm-button button-secondary" disabled>confirm</button>
			</div>
		</transition>

	</section> 
</template>

<script>
import HandleScrollLock from '@mixins/HandleScrollLock'
import Auth from  '@services/Auth';

export default {
	mixins: [ HandleScrollLock],

	data() {
		return {
			loaded: false,
			verified: false,
		}
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/register-overlay.svg';
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
			},

			immediate: true
		}
	},

	beforeMount() {
		this.load();
	},

	methods: {
		async load() {
			let user = await Auth.user.get();

			this.verified = user.verified;
			this.loaded = true;
		}
	}
}
</script>