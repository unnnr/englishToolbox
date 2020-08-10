<template>
	<div class="player">
    	<div class="player__rationed">
    	    <iframe class="player__video" :src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    	</div>
	</div>
</template>

<script>
import bus from '../../eventbus';

export default {
	name: "video-player",

	data: function () {
		return {
			showOverlay: false,
			url: null
		}
	},

	mounted() {

		bus.listen('post-selected', event => {
			this.url = event.post.contentUrl;
		});
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