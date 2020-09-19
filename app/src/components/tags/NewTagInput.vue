<template>
	<button 
		type="button"
		class="tag tag--new tag--new-active"
		ref="wrapper"
		:class="{
				'tag--new-focused': inputIsFocused,
				'tag-new-disabled': disabled
		}"
		@click="onWrapperClick">

		<label
			class="tag__label tag__label--new"
			for="tn1"
			ref="button"
			@click="onLabelClick">
				
			<span class="material-icons-round">add</span>
		</label>
		<input 
			id="tn1"
			type="text"
			class="tag__input"
			placeholder="newTag"
			ref="input"
			v-model="label"
			:disabled="disabled"
			@blur="onInputBlur"
			@focus="onInputFocus"
			@keydown.enter.prevent.stop="tryToSubmit">

		<div class="tag__buffer" ref="buffer"></div>
	</button>
</template>

<script>

const BLUR_DELAY = 200;

export default {
	props: {
		submit: {
			type: Function,
			default: () => {}
		}
	},

	data: function() {
		return {
			label: '',
			disabled: false,
			inputIsFocused: false
		}
	},

	watch: {
			label() {
				this.checkInput();
				this.resizeInput();
			}
	},

	methods: {
		onWrapperClick()
		{
			this.inputFocus();
		},

		async onLabelClick()
		{
			this.inputFocus();

			if (this.label.length === 0 || this.disabled)
				return;

			this.tryToSubmit();
		},

		onInputBlur() {
			this.$options.delayTimer = setTimeout(() => {
				this.inputIsFocused = false;
				this.checkInput();
			}, BLUR_DELAY)
		},

		onInputFocus() {
			clearTimeout(this.$options.delayTimer)
			this.inputIsFocused = true;
		},

		inputFocus() {
			this.$refs.input.focus();
		},

		checkInput() {
			if (this.label.length === 0 && !!!this.inputIsFocused)
				clearTimeout(this.$options.delayedTimer)
		},

		resizeInput() {
			let buffer = this.$refs.buffer;
			let input = this.$refs.input;
			
			buffer.innerHTML = this.label;
			
			input.style.width = buffer.clientWidth + 3 + 'px';
		},

		setUpInputAutoGrow() {
					
			let buffer = this.$refs.buffer;
			let input = this.$refs.input;

			input.addEventListener('input', function() {
				buffer.innerHTML = this.value;
				input.style.width = buffer.clientWidth + 3 + 'px';
			});
		},

		tryToSubmit() {

			this.disabled = true;

			try {
				this.submit();
			}
			catch {
				console.error('There was an error in tag submitting.');
			}
			finally {
				this.label = '';
				this.disabled = false;
			}
		}
	}
}
</script>

<style scoped>


.tag__buffer {
    position: absolute;
    top: -1000px;
    left: -1000px;
    visibility: hidden;
    white-space: pre;
}

</style>