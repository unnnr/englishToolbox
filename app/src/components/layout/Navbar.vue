<template>
	<section class="navbar container">
		<mobile-navbar 
			v-if="mobile"
			:profileShown="profileShown"
			:app-name="appName"
			:avatar="avatar"/>

		<desktop-navbar 
			v-else
			:profileShown="profileShown"
			:app-name="appName"
			:avatar="avatar"/>

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
			mobile: true,
			appName: 'Etoolbox',
			avatar: '#',

			isMobileNavShown: false,
			profileShown: false,

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
		Auth.check().then( async authenticated => {
			this.avatar = await Avatar.get();
			this.profileShown = authenticated;
		});

		Auth.onChange( async authenticated => {
			this.avatar = await Avatar.get();
			this.profileShown = authenticated
		});

		this.listen({
			'avatar-changed': image => 
				this.avatar = image
		})

		this.mobile = Resolution.isMobile();

		Resolution.listen(this.check);
	},

	beforeDestroy() {
		Resolution.detach(this.check);
	},

	methods: {
		check(mobile) {
			this.mobile = true;
		},

		showMobileNav() {
			this.isMobileNavShown = true;
		},

		hideMobileNav() {
			this.isMobileNavShown = false;
		},

		moblieNavClicked(event) {
			let nav = this.$refs.mobileNav;

			if (nav !== event.target)
				this.hideMobileNav()
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