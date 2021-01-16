<template>
	<section class="navbar container">
		<desktop-navbar 
			v-if="desktop"

			:app-name="appName"
			:avatar="avatarUrl"
			:links="links"

			:profile-shown="profileShown"
			:loaded="loaded"/>
		
		<mobile-navbar 
			v-else

			:app-name="appName"
			:avatar="avatarUrl"
			:links="links"

			:profile-shown="profileShown"
			:loaded="loaded"/>
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

			profileShown: null,
			desktop: true,
			loaded: false,

			links: [
				{ name: '/home#about', 			label: 'about me'},
				{ name: '/videos', 					label: 'videos'},
				{ name: '/audio', 					label: 'audio'},
				{ name: '/charts', 					label: 'charts'},
				{ name: '/games', 					label: 'games'},
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
		resolutionChanged(type) {
			this.desktop = Resolution.DESKTOP === type;
		},

		async authChanged(authenticated) {
			this.loaded = true;
			this.profileShown = authenticated

			this.avatar = authenticated ? await Avatar.get() : '';
		}
	},

}
</script>
