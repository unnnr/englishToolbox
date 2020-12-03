<template>
	<section class="navbar container">
		<mobile-navbar 
			v-if="mobile"
			:profileShown="profileShown"
			:app-name="appName"
			:avatar="avatar"
			:links="links"/>

		<desktop-navbar 
			v-else
			:profileShown="profileShown"
			:app-name="appName"
			:avatar="avatarUrl"
			:links="links"/>

	</section>
</template>

<script>
// services
import Resolution from '@services/Resolution'
import Avatar from '@models/Avatar'
import Auth from '@services/Auth';

// mixins
import HandleEvents from '@mixins/HandleEvents'

// components
import DesktopNavbar from '@components/layout/DesktopNavbar'
import MobileNavbar from '@components/layout/MobileNavbar'


export default {
	components: {
		DesktopNavbar,
		MobileNavbar
	},

	mixins: [ HandleEvents ],

	data() {
		return {
			appName: 'EnglishNerd',
			avatar: '#',

			profileShown: false,
			mobile: true,

			links: [
				{ name: '/home#about', label: 'about me'},
				{ name: '/videos', label: 'videos'},
				{ name: '/audio', label: 'audio'},
				{ name: '/recommendations', label: 'I recommend'},
			]
		}
	},

	computed: {
		avatarUrl() {
			return 'url(' + this.avatar + ')';
		}
	},

	beforeMount() {
		Auth.check().then(this.authChanged);
		Auth.onChange(this.authChanged);

		Resolution.bind(this.resolutionChanged);

		this.listen({ 'avatar-changed': image => 
			this.avatar = image
		})
	},

	beforeDestroy() {
		Resolution.detach(this.check);
	},

	methods: {
		resolutionChanged(mobile, tablet, desktop) {
			this.mobile = !!!desktop;
		},

		async authChanged(authenticated) {
			this.avatar = await Avatar.get();
			this.profileShown = authenticated
		}
	},

}
</script>
