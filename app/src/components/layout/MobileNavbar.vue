<template>
	<div 
		class="navbar-mobile"
		@click="hide">
		
		<button  
			class="navbar-mobile__button navbar-mobile__button--show"
			@click.stop="show">
		</button>

		<router-link
			class="navbar-mobile__logo"
			to="/home">

			{{ appName }}
		</router-link>

		<nav 
			class="navbar-mobile__links"
			:class="{'navbar-mobile__links--slide': shown}"
			ref="mobileNav"
			@click.self.stop="() => null">

			<div 
				class="navbar-mobile__header"
				@click.self.stop="() => null">
				
				<router-link
					v-if="profileShown"
					class="navbar-mobile__account-link"
					:style="{'background-image': avatar}"
					to="/profile">
				</router-link>

				<button
					class="navbar-mobile__button navbar-mobile__button--hide"
					@click="hide">
					
				</button>
			</div>

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
					to="/login">
					
					login in
				</router-link>

				<router-link
					class="navbar-mobile__footer-link navbar-mobile__footer-link--sign-up"
					v-if="!!!profileShown"
					to="/register">
					
					sing up
				</router-link>
			</div>
		</nav>

		<transition name="fade">
			<div 
				v-if="shown"
				class="navbar-mobile__overlay"
				:class="{'navbar-mobile__overlay--visible': true}"
				@click.self="hide">
			</div>
		</transition>

	</div>
</template>

<script>
import HandleScrollLock from '@mixins/HandleScrollLock'

export default {
	mixins: [HandleScrollLock],

  props: {
    appName: { type: String, default: '' },
    
		avatar: { type: String, default: '' },
		
		links: { type: Array, default: () => [] },
  
    profileShown: { type: Boolean, default: false }
  },

  data() {
    return {
      shown: false
    }
  },

 	methods: {
		show() {
			this.shown = true;
			this.lockScroll()
		},

		hide() {
			this.shown = false;
			this.unlockScroll()
		}
	}
}
</script>