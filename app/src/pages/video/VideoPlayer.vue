<template>
	<div 
		class="player"
		ref="player">
    	
		<div class="player__rationed">
  			<iframe class="player__video"
			  	frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			  	:src="'https://www.youtube.com/embed/' + videoID + '?enablejsapi=1&color=white'"
				allowfullscreen>
			</iframe>
			<transition name="fade">
				<div 
					v-if="showOverlay"
					class="player__overlay">
      				
					<object class="player__overlay-image" :data="overlayUrl" type="image/svg+xml"></object>
    			</div>
			</transition>
    	</div>
	</div>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'

export default {
	mixins: [ HandleEvents ],

	data: function () {
		return {
			showOverlay: true,
			videoID: null
		}
	},

	computed: {
		overlayUrl() {
			return window.location.origin + '/img/svg/video-overlay.svg';
		}
	},

	mounted() {	
		this.listen({
			'post-selected': event => {
				this.videoID = event.post.youtubeId;
				this.showOverlay = false;

				if (!!!event.preventScrolling)
      	  this.scrollToPlayer();
			},

			'post-creating': event => {
				this.showOverlay = true;
			},

			'post-editing': event => {
				this.videoID = event.post.youtubeId;
				this.showOverlay = false;
			},

			'editor-link-changed': event => {		
				this.videoID = event.youtubeId;
				this.showOverlay = false;
			},

			'post-deleted': event => {

			}
		});
	},

	methods: {
		scrollToPlayer() {
			window.scrollTo({
				top: 0 ,
				behavior: 'smooth' 
			})
		}
  }
};
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 1s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>