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
						v-for="(link, index) in links"
						:key="index"
						:to="link.name"
						:class="{'navbar-desktop__link--active': link.active}">
						
						{{ link.label }}
					</router-link>
			</nav>
			<div class="navbar-desktop__aside">
					<router-link v-if="!!!profileShown"
						class="navbar-desktop__aside-link navbar-desktop__aside-link--login-in"
						to="Login">
							
						login in
					</router-link>

					<router-link v-if="!!!profileShown"
						class="navbar-desktop__aside-link navbar-desktop__aside-link--sign-up"
						to="Register"> 
							
						sing up
					</router-link>

					<router-link
						class="navbar-desktop__account-link"
						v-if="profileShown"
						to="Profile">
							
						<span class="material-icons-round">account_circle</span>
					</router-link>

			</div>
		</div>

		<div class="navbar-mobile">
			<button  
				class="navbar-mobile__button navbar-mobile__button--show"
				@click="showMobileNav">
					
					<span class="material-icons-round">menu</span>
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

						<span class="material-icons-round">account_circle</span>
					</router-link>
						<button
							class="navbar-mobile__button navbar-mobile__button--hide"
							@click="hideMobileNav">
							
							<span class="material-icons-round">clear</span>
						</button>
				</div>
					<router-link
						class="navbar-mobile__link"
						to="Home">
						
						{{  AppName }}
					</router-link>

					<router-link
						class="navbar-mobile__link"
						v-for="(link, index) in links"
						:key="index"
						:to="link.name"
						:class="{'navbar-desktop__link--active': link.active}">
							
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
`
<script>
import Auth from '@services/Auth';

export default {
	name: 'navbar',

	data: function() {
		return {
			isMobileNavShown: false,

			profileShown: true,

			AppName: 'Etoolbox',

			links: [
				{ name: 'About', label: 'about me'},
				{ name: 'Videos', label: 'videos'},
				
			]
		}
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

	beforeMount() {

		Auth.onload(() => {
			this.profileShown = Auth.check();
		});
	},
}
</script>