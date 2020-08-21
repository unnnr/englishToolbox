<template>
	<div class="player">
        <div class="player__rationed">
            <div class="player__image"></div>
                <!--  <div class="player__overlay">
                  <object class="player__overlay-image" data="{{ asset("img/svg/audio-overlay.svg") }}"
                    type="image/svg+xml"></object>
                </div>  -->
            <div class="audio">
                <div class="audio__player">
                    <button class="audio__button-toggle"><i class="material-icons">visibility</i><span>show</span></button>
                <div class="audio__progress-control">
                    <button class="audio__button-state"><i class="fas fa-play"></i></button>
                    <div class="audio__progress-bar">
                        <div class="audio__progress-current">
                            <button class="audio__progress-cursor"></button>
                        </div>
                        <div class="audio__progress-maximum"></div>
                    </div>
                    <time class="audio__timer">
                        <span class="audio__timer-current">0:00</span>
                        <span class="audio__timer-separator">/</span>
                        <span class="audio__timer-maximum">0:00</span>
                    </time>
                </div>
                <div class="audio__volume-control">
                    <button class="audio__volume-button"><span class="material-icons-round">volume_up</span></button>
                        <div class="audio__volume-bar">
                            <div class="audio__volume-current">
                                <button class="audio__volume-cursor"></button>
                            </div>
                            <div class="audio__volume-maximum"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@services/eventbus';

export default {
	name: "audio-player",

	data: function () {
		return {
			showOverlay: true,
			overlayUrl: window.location.origin + '/img/svg/video-overlay.svg',
			videoID: 'null'
		}
	},

	mounted() {

		bus.listen('post-selected', event => {
			this.videoID = event.post.videoID;
			this.showOverlay = false;
		});

		bus.listen('post-creating', event => {
			this.showOverlay = true;
		});

		bus.listen('post-editing', event => {
			this.videoID = event.post.videoID;
			this.showOverlay = false;
		});

		bus.listen('editor-link-changed', event => {		
			this.videoID = event.videoID;
			this.showOverlay = false;
		})

		bus.listen('post-deleted', event => {
			this.videoID = event.post.videoID;
			this.showOverlay = false;
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