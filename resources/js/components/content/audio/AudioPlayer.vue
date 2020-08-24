<template>
	<div 
        class="player"
        ref="player">

        <div class="player__rationed">
            <div 
                class="player__image"
                :style="{ 'background-image':  backgroundImage}"
                :class="{'player__image--blurred': image.blured }">
            </div>
            <transition name="fade">

                <div 
                    class="player__overlay"
                    v-if="overlay.shown">

                    <object class="player__overlay-image" 
                        type="image/svg+xml"
                        :data="overlay.url">
                    </object>
                </div>
            </transition>
            <div class="audio">
                <div class="audio__player">
                    <button 
                        class="audio__button-toggle"
                        @click.prevent="toggleShowHide">

                        <i class="material-icons">{{ visibilityIcon }}</i><span>{{ toggleButtonMessage }}</span>
                    </button>
                    <div class="audio__progress-control">
                        <button
                            class="audio__button-state"
                            @click="togglePlayPause">

                            <i 
                                class="fas"
                                :class="{'fa-play': !!!audio.playing, 'fa-pause': audio.playing }">
                            </i>
                        </button>
                        <progress-slider 
                            ref="progressSlider" 
                            :max="getAudioDuration()"
                            :value.sync="currentTime"
                            @thumb-moved="changePlayerPosition"
                            @thumb-start-moving="pauseAudio"
                            @thumb-end-moving="playAudio"/>
                        <time class="audio__timer">
                            <span class="audio__timer-current">{{ labels.currentTime }}</span>
                            <span class="audio__timer-separator">/</span>
                            <span class="audio__timer-maximum">{{ labels.duration }}</span>
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
            toggleButtonMessage: 'show',
            
            overlay: {
                url:  window.location.origin + '/img/svg/audio-overlay.svg',
                shown: true
            },

            image: {
                blured: true,
                url: null,
            },
 
            audio: {
                playable: false,
                playing: false,
                url: null,
            },

            labels: {
                currentTime: '00:00',
                duration: '00:00'
            },

            currentTime: 0,

            player: new Audio(),

        }
    },
    
    computed: {
        backgroundImage() {
            if (this.image.url)
                return `url('${this.image.url}')`

            return null;
        },

        visibilityIcon() {
            if (this.image.blured) 
                return 'visibility';
            else  
                return 'visibility_off';
        },
    },

    watch: {
        'audio.url' : function(url) {

            let slider = this.$refs.progressSlider;

            this.player.src = url;

            this.player.addEventListener('canplaythrough', () => {
                this.audio.playable = true;
                this.labels.duration =  this.parseTime(this.getAudioDuration());
            }, {once: true});
        }
    },

	mounted() {
        this.player.addEventListener('timeupdate', event => {
            this.currentTime = this.player.currentTime * 1000;
            this.labels.currentTime = this.parseTime(this.currentTime);
        });

		bus.listen('post-selected', event => {
            let audio = event.post;

            this.clear();

            this.audio.url = audio.audioUrl;
            this.image.url = audio.imageUrl;
            this.overlay.shown = false;

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

            this.audio.url = audio.audioUrl;
            this.imageUrl = audio.imageUrl;

			this.overlay.shown = false;
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

            this.image.url = '';
            this.image.blured = true;

            this.audio.playable = false;
            this.audio.playing = false;
            this.audio.url = null;

        },

        toggleShowHide() {
            this.image.blured = !!!this.image.blured ;

            if (this.image.blured )
                this.toggleButtonMessage = 'show';
            else
                this.toggleButtonMessage = 'hide';
        },

        parseTime(ms) {
            let minutes = Math.floor(Math.floor(ms / 1000) / 60);
            let seconds = Math.floor(ms / 1000) - minutes * 60;

            if (minutes > 59)
                minutes = seconds =  '--';

            return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
        },

        changePlayerPosition(value) {
            this.player.currentTime  = value / 1001;
        },

        togglePlayPause(event) {
            console.log(event, 123); 

            if (this.audio.playing)
                this.pauseAudio();
            else
                this.playAudio();       
        },

        playAudio() {
            if (!!!this.audio.playable)
                return;

            this.audio.playing = true;
            this.player.play();
        },

        pauseAudio() {
            if (!!!this.audio.playable)
                return;

            this.audio.playing = false;
            this.player.pause();
        },

        getAudioDuration() {
            return this.player.duration * 1000;
        }
    }
};
</script>

<style scoped>
    .player__image {  
        transition: filter .5s;
    }
    
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 1s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>