<template>
	<div class="player">
    	<div class="player__rationed">
  			<iframe class="player__video"
			  		frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			  		:src="'https://www.youtube.com/embed/' + videoID + '?enablejsapi=1&color=white'"
					allowfullscreen>
			</iframe>
			<transition name="fade">
				<div v-if="showOverlay" class="player__overlay">
      				<object class="player__overlay-image" :data="overlayUrl" type="image/svg+xml"></object>
    			</div>
			</transition>
    	</div>
	</div>
</template>

<script>
import bus from '../../eventbus';

export default {
	name: "video-player",

	data: function () {
		return {
			showOverlay: true,
			overlayUrl: window.location.origin + '/img/svg/video-overlay.svg',
			videoID: 'null'
		}
	},

	mounted() {
		bus.listen('post-editing', event => {
			this.showOverlay = true;
		});

		bus.listen('post-selected', event => {
			this.showOverlay = false;
			this.videoID = event.post.videoID;
		});

		bus.listen('post-editing', event => {
			this.videoID = 'null';
		});

		bus.listen('editor-link-changed', event => {		
			this.videoID = event.videoID;
			this.showOverlay = false;
		})
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