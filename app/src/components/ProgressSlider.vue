<template>
	  <div 
        class="progress-bar"
        ref="slider"
        @click="moveThumb">
                            
            <div 
                ref="progressFilled"
                class="progress-current"
                :class="{'progress-current--smooth': !!!isThumbActive}"
                :style="{'width': progress + '%'}">

            <button 
                ref="thumb" 
                class="progress-thumb"
                @mousedown="activeThumb">
            </button>
        </div>
        <div class="progress-maximum"></div>
    </div>
</template>

<script>
export default {
    name: "progress-slider",
    
    props: {

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

            let newProgress = progress * 100 / this.max;
            if (newProgress > 100)
                newProgress = 100;
                
            this.progress = newProgress;    
        }
    },

	mounted() {
        document.addEventListener('mouseup', this.disableThumb);
        document.addEventListener('mousemove', this.onMove);

        this.progress = this.value * 100 / this.max;
    },
    
    methods: {

        disableThumb() {
            if (this.isThumbActive)
                this.$emit('thumb-end-moving');
                
            this.isThumbActive = false;

            document.documentElement.style.cursor = "unset";
        },

        activeThumb() {
            if (!!!this.isThumbActive)
                this.$emit('thumb-start-moving');

            this.isThumbActive = true;

            document.documentElement.style.cursor = "grabbing";
        },

        onMove(event) {
            if (this.isThumbActive)
                this.moveThumb(event);
        },

        moveThumb(event) {
            let slider = this.$refs.slider;
            
            let sliderWidth = slider.offsetWidth;
            let sliderLeft = slider.getBoundingClientRect().left;
            let cursoreLeft =  event.pageX;

            // Counting distance in px
            let distance = cursoreLeft - sliderLeft;

            if (distance < 0)
                distance = 0;

            else if (distance > sliderWidth)
                distance = sliderWidth;

            // Counting progress in %
            this.progress = distance * 100 / sliderWidth;       

            let value = this.progress * this.max / 100;
            
            if (this.progress >= 100)
                value = this.max;

            this.$emit('thumb-moved', value);
            this.$emit('update:value', value);
        }
    }
};
</script>