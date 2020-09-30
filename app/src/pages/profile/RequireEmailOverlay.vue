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

export default {
	data: function() {
		return {
				shown: true
		}
	},

	computed: {
		imageUrl() {
			return window.origin + '/img/svg/register-overlay.svg';
		}
	},

	beforeMount() {
		Auth.logout();

		Auth.check().then(authenticated => 
				console.log()	
			//this.shown = !!!Auth.isVerified
		);
	}
}
</script>
