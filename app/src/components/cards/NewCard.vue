<template>
	<div class="card card--add card--margined">
	<button 
		class="card__image"
	 	@click="onClick">

	<div class="card__title heading-fifth">Add new {{ postType }}</div>
		</button>
	</div>
</template>

<script>
import bus from '@services/eventbus';

export default {
	props: {
		postType: {
			type: String,
			default: 'post'
		}
	},

	methods: {
		onClick () {
			bus.dispatch('new-card-touched', { card: this });
		}
	}
}
</script>