<template>
	<div 
        class="player"
        ref="player">

        <div class="player__rationed">
            <div 
                class="player__image"
                :style="{ 'background-image':  backgroundImage}"
                :class="{ 'player__image--blurred': image.blured }">
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
                            :max="getAudioDuration()"
                            :value.sync="audio.currentTime"
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
                        <button 
                            class="audio__volume-button"
                            @click="toggleVolume">
                            
                            <span class="material-icons-round">{{ volumeIcon }}</span>
                        </button>
                        <progress-slider 
                            class="audio__volume-bar"
                            :max="getAudioMaxVolume()"
                            :value.sync="audio.volume"
                          />
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
                currentTime: 0,
                volume: 1,
                volumeBeforeMute: 1,
                muted: false,
                playable: false,
                playing: false,
                url: null,
            },

            labels: {
                currentTime: '00:00',
                duration: '00:00'
            },

            player: new Audio(),

        }
    },
    
    computed: {
        backgroundImage() {
            if (this.image.url)
                return `url('${this.image.url}')`

            return '#';
        },

        visibilityIcon() {
            if (this.image.blured) 
                return 'visibility';
            else  
                return 'visibility_off';
        },

        volumeIcon() {
            
            if (this.audio.volume == 0)
                return 'volume_off';
                
            if (this.audio.volume < 0.33)
                return 'volume_mute';

            if (this.audio.volume  < 0.66)
                return 'volume_down';
                
            return 'volume_up';
        }
    },

    watch: {
        'audio.volume': function(value){
            this.player.audio = value;
        },  

        'audio.url' : function(url) {
            if (!!!url)
                return;

            let slider = this.$refs.progressSlider;

            this.player.src = url;

            this.player.addEventListener('canplaythrough', () => {
                this.audio.playable = true;
                
                this.player.volume = this.audio.volume;
                
                let duration = this.getAudioDuration();
                this.labels.duration = this.parseTime(duration);
            }, {once: true});
        }
    },

	mounted() {
        this.player.addEventListener('timeupdate', event => {
            this.audio.currentTime = this.player.currentTime * 1000;
            console.log(this.audio.currentTime);
            this.labels.currentTime = this.parseTime(this.audio.currentTime);
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
            this.clear();
		});

		bus.listen('post-editing', event => {
            let audio = event.post;

            this.clear();

            this.audio.url = audio.audioUrl;
            this.image.url = audio.imageUrl;

			this.overlay.shown = false;
		});

		bus.listen('editor-image-changed', event => {

            this.image.url = event.imageUrl;

            if (this.audio.url && this.image.url)
			    this.overlay.shown = false;
        })
        
        bus.listen('editor-audio-changed', event => {	
            
            this.audio.url = event.audioUrl;
            
			if (this.audio.url && this.image.url)
			    this.overlay.shown = false;
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

            this.audio.currentTime = 0;
            this.audio.volume = 1;
            this.audio.playable = false;
            this.audio.playing = false;
            this.audio.url = null;

            this.overlay.shown = true;
        },

        toggleShowHide() {
            this.image.blured = !!!this.image.blured ;

            if (this.image.blured )
                this.toggleButtonMessage = 'show';
            else
                this.toggleButtonMessage = 'hide';
        },

        togglePlayPause(event) {
            if (this.audio.playing)
                this.pauseAudio();
            else
                this.playAudio();       
        },

        toggleVolume() {
            if(this.audio.volume > 0)
            {
                this.audio.volumeBeforeMute = this.audio.volume;
                this.audio.volume = 0;
            }
            else 
            {
                let previousVolume = this.audio.volumeBeforeMute;

                if (previousVolume)
                    this.audio.volume = previousVolume;
                else
                    this.audio.volume = 1;
            }
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
        },

        getAudioMaxVolume() {
            return 1;
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