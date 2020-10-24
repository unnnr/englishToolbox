<template>
	<div 
		class="card"
		:class="{
			'card--selected': selected,
			'card--margined': margined,
			'card--square': isSquare,
			'card--rectangle': isRecatangle}">

		<div 
			class="card__image" 
			v-context:items="contextItems"
			:style="{ 'background-image': 'url(\'' + imageUrl + '\')' }"
			@click="select">
			
			<div class="card__header">
				<button 
					class="card__favorite-button"
					@click.stop="">
				</button>
				<div class="card__views">{{ generatedView }}</div>
			</div>
			<!-- <h5 class="card__title heading-fifth">{{ title }}</h5> -->
			<div class="card__title">
				<h1 class="heading-sixth">{{ title }}</h1>
			</div>
		</div>
		<div class="card__text">
			<p class="text-third">{{ description }}</p>
		</div>
		<div class="card__footer">
				<div class="card__tags">
					<div 
						class="card__tag-secondary card__tag tag tag--circle"
						v-for="({color}, index) in tags"
						:key="index"
						:style="{'background-color': color}">
					</div>
					<button 
						class="card__tag-main tag tag--main"
						type="button"
						v-if="mainTag"
						:style="{'background-color': mainTag.color}">

						<span class="tag__name" for="cb2">{{ mainTag.label }}</span>
					</button>
				</div>
				<time class="card__date">{{ createdAt }}</time>
		</div>
	</div>
</template>

<script>

import bus from '@services/eventbus';

export default {
	props: {
		// Booleans
		selected:	{ type: Boolean, default: false },

		editable:  { type: Boolean, default: false },

		margined: { type: Boolean, default: false},

		squareForm: { type: Boolean, default: false },

		rectangleForm: { type: Boolean, default: false },


		// Card data
		description: { type: String,  default: '' },

		createdAt: { type: String, default: 'Jul 20 2020' },

		imageUrl: { type: String, default: '#' },

		title: { type: String, default: '' },

		mainTag: { type: Object, default: null },

		tags: { type: Array, default: function() {
				return []
			}
		}
	},

	data: function() {
		return {
			contextItems: [
				{   
					label: 'Open',
					action: () => {
						bus.dispatch('card-selecting', { card: this });
					}
				}
			]
		}   
	},

	computed: {
		generatedView() {
			return Math.floor(Math.random() * 10);
		},

		isSquare() {
			return this.squareForm || (!!!this.squareForm &&  !!!this.rectangleForm);
		},

		isRecatangle() {
			return !!!this.squareForm && this.rectangleForm;
		}
	},

	methods: {
		select() {
			bus.dispatch('card-selecting', { card: this });
		}
	},

	beforeMount() {
		if (!!!this.editable)
				return;

		this.contextItems.push({   
			label: 'Edit',

			action: () =>
					bus.dispatch('card-editing', { card: this })
		});

		this.contextItems.push(	{ 
			label: 'Delete',

			action: () => 
					bus.dispatch('card-deleting', { card: this })
		});
	}
}
</script>