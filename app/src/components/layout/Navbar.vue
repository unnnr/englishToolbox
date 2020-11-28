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
import DesktopNavbar from '@components/layout/DesktopNavbar'
import MobileNavbar from '@components/layout/MobileNavbar'
import HandleEvents from '@mixins/HandleEvents'
import Resolution from '@services/Resolution'
import Avatar from '@models/Avatar'
import Auth from '@services/Auth';

export default {
	components: {
		DesktopNavbar,
		MobileNavbar
	},

	mixins: [ HandleEvents ],

	data() {
		return {
			appName: 'Etoolbox',
			avatar: '#',

			profileShown: false,
			mobile: true,

			links: [
				{ name: '/home#about', label: 'about me'},
				{ name: '/videos', label: 'videos'},
				{ name: '/audio', label: 'audio'},
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

		this.mobile = Resolution.isMobile();
		Resolution.listen(this.resolutionChanged);

		this.listen({ 'avatar-changed': image => 
			this.avatar = image
		})
	},

	beforeDestroy() {
		Resolution.detach(this.check);
	},

	methods: {
		resolutionChanged(mobile) {
			this.mobile = mobile;
		},

		async authChanged(authenticated) {
			this.avatar = await Avatar.get();
			this.profileShown = authenticated
		}
	},

}
</script>

<style scoped>

.navbar-mobile__link {
	transition: all .3s;
}

.navbar-desktop__link {
	transition: all .3s;
}

</style>