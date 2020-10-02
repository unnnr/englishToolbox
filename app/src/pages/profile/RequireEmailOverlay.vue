<template>
	<section 
		class="register-overlay"
		v-if="shown">

		<object
			class="register-overlay__image"
			type="image/svg+xml"
			:data="imageUrl">
		</object>
	</section> 
</template>

<script>

import Auth from  '@services/Auth';
import HandleEvents from '@mixins/HandleEvents'

export default {
	mixins: [ HandleEvents ],

	data: function() {
		return {
				shown: false
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
