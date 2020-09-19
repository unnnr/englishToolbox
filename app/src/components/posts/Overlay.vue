<template>
	<transition name="fade">
		<div 
			class="selected__overlay container"
			v-if="shown">


			<object 
				class="selected__overlay-image" 
				type="image/svg+xml"
				v-if="empty"
				:data="src">
			</object>

			<div 
				class="selected__overlay-loading"
				v-else>
			</div>
		</div>
	</transition>

</template>

<script>

import HandleEvents from '@mixins/HandleEvents'

export default {
	name: 'overlay',

	mixins: [ HandleEvents ],

	props: {
		src: {
			type: String,
			default: ''
		}
	},

	data: function() {
		return {
			shown: true,
			empty: false
		}
	},

	mounted() {
		this.listen({
			'overlay-showing': () => {
				this.shown = true;
			},

			'overlay-showing--empty': () => {
				this.shown = true;
				this.empty = true;
			}, 
			
			'overlay-hidding':  () => {
				this.shown = false;
			}, 

			'post-selected': () => {
				this.shown = false;
			}, 

			'post-creating': () => {
				this.shown = false;
			}
		})
	}
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.selected__overlay-loading {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    background-color: white;
}

</style>