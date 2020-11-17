<template>
	<div 
		class="audio-player__status-bar"
		ref="slider">

		<div 
			class="audio-player__status-bar-current"
			:style="{'width': margin}">
		</div>
		
		<div class="audio-player__status-bar-total"></div>
		
		<div 
			class="audio-player__status-bar-thumb"
			:style="{'margin': margin}"
			@mousedown="activeThumg">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			width: null,
			left: null,
			progress: 0,
			active: false,
		}
	},

	computed: {
		margin() {
			return this.progress + '%';
		}
	},

	mounted() {
		document.addEventListener('mouseup', this.disableThumb);
		document.addEventListener('mousemove', this.moveThumb);
		document.addEventListener('mouseleave', this.disableThumb);
	},

	beforeDestroy() {
		document.removeEventListener('mouseup', this.disableThumb);
		document.removeEventListener('mousemove', this.moveThumb);
		document.removeEventListener('mouseleave', this.disableThumb);
	},

	methods: {
		computeAnchors() {
			let slider = this.$refs.slider;
			if (!!!slider)
				return;
			
			this.width = slider.offsetWidth;
			this.left  = slider.getBoundingClientRect().left;
		},

		activeThumg() {
			if (this.active)
				return;

			this.computeAnchors();
			this.active = true;

			this.start = Date.now()
		},

		disableThumb() {
			if (!!!this.active)
				return;
				
			this.active = false;
		},

		moveThumb(event) {
			if (!!!this.active)
				return;
			
			let sliderWidth = this.width;
			let sliderLeft = this.left;
			let cursoreLeft = event.pageX;

			let position = cursoreLeft - sliderLeft;
			
			if (position < 0)
				position = 0;
			else if (position > sliderWidth)
				position = sliderWidth;

			let progress = position * 100 / sliderWidth;

			if (progress > 100)
				progress = 100;

			this.progress = progress;

			console.log(Date.now() - this.start);
			this.start = Date.now();
		}
	}
}
</script>