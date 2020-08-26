<template>
	  <div 
        class="progress-bar audio__progress-bar"
        ref="slider"
        @click="moveThumb">
                            
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

        value: {
            type: Number,
            default: 0
        }
    },

	data: function () {
		return {
            isThumbActive: false,
            progress: 0,
            isSmooth: true
        }
    },

    watch: {
        value(progress) {
            if (this.isThumbActive)
                return;

            this.progress = progress * 100 / this.max;

            this.$emit('update:value', this.value);
        }
    },

	mounted() {
        document.addEventListener('mouseup', this.disableThumb);
        document.addEventListener('mousemove', this.onMove);
    },
    
    methods: {

        disableThumb() {
            if (this.isThumbActive)
                this.$emit('thumb-end-moving');
                
            this.isThumbActive = false;
        },

        activeThumb() {
            if (!!!this.isThumbActive)
                this.$emit('thumb-start-moving');

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

            if ( this.progress >= 100)
                this.$emit('thumb-moved', this.max);
            else
                this.$emit('thumb-moved', this.progress * this.max / 100);
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