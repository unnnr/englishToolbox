<template>
	<div 
        class="player"
        ref="player">

        <div class="player__rationed">
            <div 
                class="player__image"
                :style="{ 'background-image':  backgroundImage}">
            </div>
            <transition name="fade">

                <div 
                    class="player__overlay"
                    v-if="showOverlay">

                    <object class="player__overlay-image" 
                        type="image/svg+xml"
                        :data="overlayUrl">
                    </object>
                </div>
            </transition>
            <div class="audio">
                <div class="audio__player">
                    <button 
                        class="audio__button-toggle"
                        @click="toggleShowHide">

                        <i class="material-icons">visibility</i><span>{{ toggleButtonMessage }}</span>
                    </button>
                    <div class="audio__progress-control">
                        <button
                            class="audio__button-state"
                            @click="togglePlayPause">

                            <i 
                                class="fas"
                                :class="{'fa-play': !!!isAudioPlaying, 'fa-pause': isAudioPlaying}">
                            </i>
                        </button>
                        <progress-slider/>
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
import ProgressSlider from '@components/ProgressSlider'

export default {
	name: "audio-player",

    components: {
        ProgressSlider
    },

	data: function () {
		return {
			showOverlay: true,
            
            overlayUrl: window.location.origin + '/img/svg/audio-overlay.svg',
            imageUrl: null,
            audioUrl: null,

            toggleButtonMessage: 'show',
            isImageBlured: true,
            isAudioPlaying: true,
        }
    },
    
    computed: {
        backgroundImage() {
            if (this.imageUrl)
                return `url('${this.imageUrl}')`

            return null;
        }
    },

	mounted() {

		bus.listen('post-selected', event => {
    
            let audio = event.post;

            this.clear();

            this.audioUrl = audio.audioUrl;
            this.imageUrl = audio.imageUrl;
            this.showOverlay = false;

            if (!!!event.disableScrolling)
                this.scrollToPlayer();
		});

		bus.listen('post-creating', event => {
            this.audioUrl = null;
            this.imageurl = null;
			this.showOverlay = true;
		});

		bus.listen('post-editing', event => {
            let audio = event.audio;

            this.audioUrl = audio.audioUrl;
            this.imageUrl = audio.imageUrl;

			this.showOverlay = false;
		});

		bus.listen('editor-image-changed', event => {		
			this.showOverlay = false;
        })
        
        bus.listen('editor-audio-changed', event => {		
			
		})

		bus.listen('post-deleted', event => {
			
        });

    },
    
    methods: {
        scrollToPlayer() {

            const SHIFT = 10;

            let player = this.$refs.player;

            let relatedTop = player.getBoundingClientRect().top;
            let distance  = relatedTop - SHIFT;

            if (relatedTop < 0)
                window.scrollBy({
                    top: distance ,
                    behavior: 'smooth' 
                })
        },

        clear() {
            this.toggleButtonMessage = 'show';
            this.imageUrl = '';
            this.audioUrl = '';
            this.isImageBlured = true;
            this.isAudioPlaying = false
        },

        toggleShowHide() {
            
            this.isImageBlured = !!!this.isImageBlured;

            if (this.isImageBlured)
                this.toggleButtonMessage = 'show';
            else
                this.toggleButtonMessage = 'hide';
        },

        togglePlayPause() {
            this.isAudioPlaying = !!!this.isAudioPlaying;
        },
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