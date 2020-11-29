<template>
	<section 
		class="register-overlay"
		v-if="shown"
		@click="() => {this.shown = false}">

		<object
			class="register-overlay__image"
			type="image/svg+xml"
			:data="imageUrl">

		</object>
		<button class="register-overlay__confirm-button button-second">confirm</button>
	</section> 
</template>

<script>

import Auth from  '@services/Auth';
import HandleEvents from '@mixins/HandleEvents'

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
