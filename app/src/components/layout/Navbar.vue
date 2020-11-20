<template>
	<section class="navbar container">
		<div class="navbar-desktop">
			<nav class="navbar-desktop__links">
					<router-link 
						class="navbar-desktop__logo"
						to="Home">
						
						{{ AppName }}
					</router-link>

					<router-link
						class="navbar-desktop__link"
						active-class="navbar-desktop__link--active"
						v-for="(link, index) in links"
						:key="index"
						:to="link.name">
						
						{{ link.label }}
					</router-link>
			</nav>

			<aside class="navbar-desktop__aside">
				<router-link v-if="!!!profileShown"
					class="navbar-desktop__aside-login-in"
					to="Login">
						
					login in
				</router-link>

				<router-link v-if="!!!profileShown"
					class="navbar-desktop__aside-sign-up"
					to="Register"> 
						
					sing up
				</router-link>

				<router-link
					class="navbar-desktop__account-link"
					v-if="profileShown"
					to="Profile"
					:style="{'background-image': this.avatarUrl}">
						
				</router-link>

			</aside>	
		</div>

		<div class="navbar-mobile">
			<button  
				class="navbar-mobile__button navbar-mobile__button--show"
				@click="showMobileNav">
			</button>
			<router-link
				class="navbar-mobile__logo"
				to="Home">

					{{ AppName }}
			</router-link>
			<nav 
				class="navbar-mobile__links"
				:class="{'navbar-mobile__links--slide': isMobileNavShown}"
				ref="mobileNav"
				@click="moblieNavClicked">

				<div class="navbar-mobile__header">
					<router-link
						class="navbar-mobile__account-link"
						v-if="profileShown"
						to="Profile">
					</router-link>
						<button
							class="navbar-mobile__button navbar-mobile__button--hide"
							@click="hideMobileNav">
							
						</button>
				</div>
					<router-link
						class="navbar-mobile__link"
						to="Home">
						
						{{  AppName }}
					</router-link>

					<router-link
						class="navbar-mobile__link"
						active-class="navbar-desktop__link--active"
						v-for="(link, index) in links"
						:key="index"
						:to="link.name">
							
						{{ link.label }}
					</router-link>
					<div class="navbar-mobile__footer">

						<router-link  
							class="navbar-mobile__footer-link navbar-mobile__footer-link--login-in"
							v-if="!!!profileShown"
							to="Login">
							
							login in
						</router-link>

						<router-link
							class="navbar-mobile__footer-link navbar-mobile__footer-link--sign-up"
							v-if="!!!profileShown"
							to="Register">
							
							sing up
						</router-link>
					</div>
			</nav>
			<div 
				class="navbar-mobile__overlay"
				:class="{'navbar-mobile__overlay--visible': isMobileNavShown}"></div>
		</div>
	</section>
</template>
<script>
import HandleEvents from '@mixins/HandleEvents'
import Avatar from '@models/Avatar'
import Auth from '@services/Auth';

export default {
	mixins: [ HandleEvents ],

	data() {
		return {
			AppName: 'Etoolbox',
			avatar: '#',

			isMobileNavShown: false,
			profileShown: false,

			links: [
				{ name: 'home#about', label: 'about me'},
				{ name: 'videos', label: 'videos'},
				{ name: 'audio', label: 'audio'},
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
	},

	methods: {
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