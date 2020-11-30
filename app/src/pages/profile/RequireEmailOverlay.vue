<template>
	<section 
		class="register-overlay"
		v-if="shown"
		>

		<div class="register-overlay__body">
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

	</section> 
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'
import Auth from  '@services/Auth';

export default {
	mixins: [ HandleEvents ],

	data() {
		return {
				shown: true
		}
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/register-overlay.svg';
		}
	},

	mounted() {
		this.listen({
			'email-overlay--show': () => 
				this.shown = true
		})
	}
}
</script>

		@click="() => {this.shown = false}"