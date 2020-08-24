<template>
	  <div 
        class="audio__progress-bar"
        ref="slider"
        @click="moveThumbHorizontally">
                            
            <div 
                class="audio__progress-current"
                ref="progressFilled"
                :class="{'audio__progress-smooth': !!!isThumbActive}"
                :style="{'width': progress + '%'}">

            <button 
                class="audio__progress-cursor"
                ref="thumb"
                @mousedown="activeThumb">
            </button>
        </div>
        <div class="audio__progress-maximum"></div>
    </div>
</template>

<script>
export default {
    name: "progress-slider",
    
    props: {
        vertical: {
            type: Boolean,
            default: false
        },

        max: {
            type: Number,
            default: 120
        },
    },

	data: function () {
		return {
            isThumbActive: false,
            progress: 0,
            isSmooth: true
        }
    },
    
    computed: {
        value: {
            get() {

               // console.log('max ',this.max, this.progress)
                return this.progress * this.max / 1000;
            },

            set(value) {

                console.log(this.progress + '%');
                console.log(value + ' of ' + this.max);
                console.log('=============');


                this.progress = value * 100 / this.max;
            }
        }
    },

	mounted() {
        document.addEventListener('mouseup', this.disableThumb);
        document.addEventListener('mousemove', this.onMove);
    },
    
    methods: {

        disableThumb() {
            this.isThumbActive = false;
        },

        activeThumb() {
            this.isThumbActive = true;
        },

        onMove(event) {
            if (this.isThumbActive)
                this.moveThumb(event);
        },

        moveThumb(event) {
            if (this.vertical)
                this.moveThumbVertically(event);
            else
               this.moveThumbHorizontally(event);
                
        },

        moveThumbVertically() {

        },

        moveThumbHorizontally(event) {
            let slider = this.$refs.slider;
            
            let sliderWidth = slider.offsetWidth;
            let sliderLeft = slider.getBoundingClientRect().left;
            let cursoreLeft =  event.pageX;

            // counting distance in px
            let distance = cursoreLeft - sliderLeft;

            if (distance < 0)
                distance = 0;

            else if (distance > sliderWidth)
                distance = sliderWidth;

            // counting progress in %
            this.progress = distance * 100 / sliderWidth;
        }
    }
};
</script>

<style scoped>

    .audio__progress-smooth
    {
        transition: all .2s;
    }

    .audio__progress-cursor
    {
        transform: translateX(50%);
    }
</style>