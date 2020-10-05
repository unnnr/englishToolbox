<template>
	<div class="description">
		<div class="description__header">
			<h5 class="description__title heading-fifth">{{ title }}</h5>
			<button
				class="description__mobile-button"
				:class="{'description__mobile-button--upturned': shrinked}"
				:style="{'transition': buttonTransition}"
				@click="toggle">

				<span class="material-icons-round">
					arrow_drop_down
				</span>
			</button>
		</div>

		<div
			class="description__body"
			ref="wrapper"
			:style="{
				'height': bodyHeight,
				'transition': bodyTransition}">

			<div 
				class="description__body-content"
				ref='content'>
					
				<p class="description__text text-fourth">{{ description }}</p>
				<tag-list 
					:tags="tags"
					:main-tag="mainTag"/>
			</div>
		</div>
		

		<div class="description__footer">
				<time class="description__date">{{ createdAt }}</time>
				<div class="description__views">
					<span class="description__views-icon material-icons-round">visibility</span>
					<span class="description__views-count">{{ views }}</span>
			</div>
		</div>
	</div>

    
</template>

<script>

import Shrinkable from '@mixins/Shrinkable';
import HandleEvents from '@mixins/HandleEvents'
import TagList from '@components/tags/TagList';
import bus from '@services/eventbus';

export default {
	components: {
		TagList
	},

	mixins: [ Shrinkable],

	props: {
		target: {
			type: Object,
			default: null
		}
	},

	computed: {
		title() {
			return this.target ? this.target.title : 'Lorem ipsum dolor';
		},

		description() {
			return this.target ? this.target.description :  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'
																									 +  'dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas'
																									 +  'congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.';
		},

		createdAt() {
			return this.target ? this.target.createdAt : 'April 17 2020';
		},

		tags() {
			return this.target ? this.target.tags : []
		},

		mainTag() {
			return this.target ? this.target.mainTag : null;
		},

		views() {
			return 123;
		}
	},
}
</script>


<style scoped>

.description__body {
	overflow: hidden;
	display: block;
}

.description__text {
	word-break: break-all;
}

.description__mobile-button {
	transform-origin: 15px 15px;
}

.description__mobile-button {
	transform: rotate(0);
}

.description__mobile-button--upturned {
	transform: rotate(-180deg);
}
</style>