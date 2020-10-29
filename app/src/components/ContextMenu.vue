<template>
	<transition name="fade">
		<div v-if="shown"
			class="context"
			:style="{
				'top': marginTop,
				'left': marginLeft
			}">

			<button 
				class="context__item"
				
				v-for="([label, action], index) of menuFields"
				:key="index"

				v-click-outside="hide"
				@click="callAction(action)">

				{{ label }}
			</button>
		</div>
	</transition>
</template>

<script>

import { throttle } from 'throttle-debounce';

export default {
	data: function() 
	{
		return {
			items: [],
			shown: false,

			top: 0,
			left: 0,
		}
	},

	computed: {
		marginLeft() {
			return this.left + 'px';
		},

		marginTop() {
			return this.top + 'px';
		},

		menuFields() {
			return Object.entries(this.items);
		}
	},

	mounted() {
		window.addEventListener('scroll', 
			throttle(100, this.hide), true);
		
		this.$el.dispatchEvent(
			new CustomEvent('context:mouted', { detail: this })
		);
	},

	methods: {
		hide() {
			if (this.shown)
					this.shown = false;
		},

		async show() {
			this.hide();
			
			await this.$nextTick();

			this.shown = true;
		},

		callAction(method) {
			method(this.target);
			this.shown = false;
		}
	}
};


</script>

<style>

	.context 
	{
		position: absolute;
		z-index: 122;
	}

</style>