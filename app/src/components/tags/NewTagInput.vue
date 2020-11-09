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
			class="tag__input"
			ref="input"
			id="tn1"

			v-model="label"

			placeholder="newTag"
			maxlength="30"
			type="text"
			:disabled="disabled"

			@keydown.enter.prevent.stop="tryToSubmit"
			@focus="onInputFocus"
			@blur="onInputBlur">

		<div class="tag__buffer" ref="buffer"></div>
	</button>
</template>

<script>
import bus from '@services/eventbus'

const BLUR_DELAY = 200;

export default {
	props: {
		submit: {
			type: Function,
			default: () => {}
		}
	},

	data() {
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
		onWrapperClick() {
			this.inputFocus();
		},

		onLabelClick() {
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

		parseError(error) {
			if (!!!error || typeof error !== 'object')
				return null;

			let body = error.body;
			if (!!!body || typeof body !== 'object')
				return null;

			let errors = body.errors;
			if (!!!errors || typeof errors !== 'object')
				return null;

			let label = errors.label;
			if (!!!Array.isArray(label))
				return null;

			return label.join(', ');
		},

		async tryToSubmit() {
			try {
				this.disabled = true;
			
				if (typeof this.submit === 'function')
					await this.submit(this.label);

				this.label = '';
			}
			catch(error) {
				let message = this.parseError(error);

				bus.dispatch('alert-error', { message });
			}
			finally { 
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