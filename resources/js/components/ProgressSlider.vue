<template>
	  <div 
        class="audio__progress-bar"
        ref="slider">
                            
            <div 
                class="audio__progress-current"
                ref="progressFilled"
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
        }
    },

	data: function () {
		return {
            isThumbActive: false,
            progress: 0
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
        document.addEventListener('mouseup', this.disableThumb);
        document.addEventListener('mousemove', this.moveThumb);
    },
    
    methods: {
   
        disableThumb() {
            this.isThumbActive = false;
        },

        activeThumb() {
            this.isThumbActive = true;
        },

        moveThumb(event) {
            if (!!!this.isThumbActive)
                return;

            if (this.vertical)
                this.moveThumbVertically(event);
            else
               this. moveThumbHorizontally(event);
                
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

    .audio__progress-current
    {
    }

    .audio__progress-cursor
    {
        transform: translateX(50%);
    }
</style>