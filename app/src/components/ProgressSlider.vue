<template>
	<div 
		ref="slider"
		class="audio-player__status-bar"
		:class="{
			'audio-player__status-bar--animated': animated}"
		@click="setThumb">

		<div 
			class="audio-player__status-bar-current"
			:style="{'width': margin}">
		</div>
		
		<div 
			class="audio-player__status-bar-total">
		</div>
		
		<div 
			class="audio-player__status-bar-thumb"
			:style="{'margin-left': margin}"
			@mousedown="activeThumb">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		from: { type: Number, default: 0 },

		to: { type: Number, default: 1 },

		value: { type: Number, default: 0},

		disabled: { type: Boolean, default: false }
	},

	data() {
		return {
			width: null,
			left: null,
			progress: 0,
			active: false
		}
	},

	computed: {
		margin() {
			return this.progress + '%';
		},

		animated() {
			return !!!this.active;
		}
	},

	mounted() {
		document.addEventListener('mouseup', this.disableThumb);
		document.addEventListener('mousemove', this.onMove);
		document.addEventListener('mouseleave', this.disableThumb);
	},

	beforeDestroy() {
		document.removeEventListener('mouseup', this.disableThumb);
		document.removeEventListener('mousemove', this.onMove);
		document.removeEventListener('mouseleave', this.disableThumb);
	},

	watch: {
		value: {
			handler(value) {
				let progress = value * 100 / (this.to - this.from);
				if (progress > 100)
					progress = 100;

				this.progress = progress;
			},

			immediate: true
		},

		disabled() {
			this.active = false;
		}
	},

	methods: {
		computeAnchors() {
			let slider = this.$refs.slider;
			if (!!!slider)
				return;
			
			this.width = slider.offsetWidth;
			this.left  = slider.getBoundingClientRect().left;
		},

		activeThumb() {
			if (this.active || this.disabled)
				return;

			this.computeAnchors();
			this.active = true;
		},

		disableThumb() {
			if (!!!this.active)
				return;
			
			this.active = false;
		},

		onMove(event) {
			if (!!!this.active)
				return;

			this.moveThumb(event);
		},

		setThumb(event) {
			if (this.active || this.disabled)
				return;

			this.computeAnchors();
			this.moveThumb(event)
		},

		moveThumb(event) {
			// Computing position at px
			let sliderWidth = this.width;
			let sliderLeft = this.left;
			let cursoreLeft = event.pageX;

			let position = cursoreLeft - sliderLeft;
			
			if (position < 0)
				position = 0;
			else if (position > sliderWidth)
				position = sliderWidth;

			// Computing position at %
			let progress = position * 100 / sliderWidth;

			if (progress > 100)
				progress = 100;

			this.progress = progress;
			
			// Computing value
			let value = (this.to - this.from) * this.progress / 100;

			this.$emit('input', value);
		}
	}
}
</script>

<style lang="sass">

.audio-player__status-bar-thumb
	transform: translateX(-50%)

.audio-player__status-bar--animated .audio-player__status-bar-thumb
	transition: margin .2s

.audio-player__status-bar--animated .audio-player__status-bar-current
	transition: width .2s
	

</style>