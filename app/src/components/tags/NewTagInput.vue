<template>
	<button 
		type="button"
		class="tag tag--new tag--new-active"
		ref="wrapper"
		:class="{
				'tag--new-focused': inputIsFocused,
				'tag-new-disabled': loading}"
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
			:disabled="loading"

			@keydown.enter.prevent.stop="onTagSending"
			@focus="onInputFocus"
			@blur="onInputBlur">

		<div class="tag__buffer" ref="buffer"></div>
	</button>
</template>

<script>
import HandleRequests from '@mixins/HandleRequests'
import bus from '@services/eventbus'

const BLUR_DELAY = 200;

export default {
	mixins: [ HandleRequests ],
	
	props: {
		submit: {
			type: Function,
			default: () => {}
		}
	},

	data() {
		return {
			label: '',
			inputIsFocused: false,
			loading: false,
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

			if (this.label.length === 0 || this.loading)
				return;

			this.onTagSending();
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

		onTagSending() {
			this.sending = true;

			this.$emit('creating', { label: this.label, 
			loaded: () => {
					this.label = '';
					this.sending = false;
				} 
			});
		}
	}
}
</script>