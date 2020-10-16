<template>
	<div class="addition__info">
		<div class="addition__header">
			<button 
				class="addition__header-button text-fourth"
				:class="{'addition__header-button--active': detailsShown}"
				@click="showDetails">
				
				Description
			</button>
			<button
				class="addition__header-button text-fourth"
				@click="hideDetails">
				
				Comments
			</button>
		</div>

		<div class="addition__tabs">

			<transition name="fade">
				<div 
					class="addition__tab addition__tab--description"
					v-show="detailsShown">
					<post-info
							ref="videoInfo"
							:target="target"
							:shrinkable="mobileWidth"/>
				</div>
			</transition>
						
			<div class="addition__tab addition__tab--comments">
				<post-comments 
					:shrinkable="mobileWidth"
					:model="model"/>
			</div>
			
		</div>
	</div>
</template>

<script>

import { throttle } from 'throttle-debounce'
import PostInfo from '@components/posts/PostInfo.vue'
import PostComments from '@components/posts/PostComments'

export default {
	components: {
		PostComments,
		PostInfo
	},

	props: {
		target: {
			type: Object,
			default: null
		},

		model: {
			type: Object
		}
	},

	data: function () {
		return {
			detailsShown: true,
			mobileWidth: false,
		}
	},

	watch: {
		mobileWidth(value) {
			if (value)
				this.detailsShown = true;
		}
	},

	methods: {
		showDetails() {
			this.detailsShown =  true;
		},

		hideDetails() {
			if (!!!this.mobileWidth)
				this.detailsShown =  false;
		},

		updateWidth() {
			this.windowWidth = window.innerWidth;
		},

		onResize() {
			const WINDOW_MOBILE_BOUDARY = 1200;

			let windowWidth = window.innerWidth;

			if (windowWidth <= WINDOW_MOBILE_BOUDARY)
					this.mobileWidth = true;
			else
					this.mobileWidth = false;
		}
	},
	
	beforeMount() {
		this.onResize = throttle(300, this.onResize);
		this.onResize();

		window.addEventListener('resize', this.onResize);
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.onResize);
	}
}
</script>

<style scoped>

.fade-leave-to {
	opacity: 0;
}
</style>
