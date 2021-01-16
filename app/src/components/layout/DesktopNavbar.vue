<template>
	<div class="navbar-desktop">
		<nav class="navbar-desktop__links">
			<router-link 
				class="navbar-desktop__logo"
				to="/home">
				
				{{ appName }}
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

		<transition name="fade">
			<aside v-if="loaded" class="navbar-desktop__aside">
				<router-link v-if="!!!profileShown"
					class="navbar-desktop__aside-login-in"
					to="/login">
						
					login in
				</router-link>

				<router-link v-if="!!!profileShown"
					class="navbar-desktop__aside-sign-up"
					to="/register"> 
						
					sing up
				</router-link>

				<router-link
					class="navbar-desktop__account-link"
					v-if="profileShown"
					to="/profile"
					:style="{'background-image': avatar}">
				</router-link>
			</aside>	
		</transition>
	</div>
</template>

<script>
export default {
  props: {
    appName: { type: String, default: '' },
    
		avatar: { type: String, default: '' },
  
		links: { type: Array, default: () => [] },
  
    profileShown: { type: Boolean, default: false },

		loaded: { type: Boolean, default: false }
	}
}
</script>