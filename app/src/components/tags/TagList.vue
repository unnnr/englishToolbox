<template>
	<div class="description__tags tags">
		<h4 class="tags__title heading-fifth">Tag list</h4>
		<button 
			class="tag tag--main" 
			type="button"
			v-if="mainTag"
			:style="{ 'background-color': mainTag && mainTag.color }">
			
			<span class="tag__name" for="cb1">{{ mainTag && mainTag.label }}</span>
		</button>

		<button class="tag" type="button"
			v-for="({ label, color }, index) in tags"
			:key="index"
			:style="{ 'background-color': color }">
			
			<span class="tag__name" for="cb2">{{ label}}</span>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		tags: {
			type: Array,
			default: function () {
				return [];
			}
		},

		mainTag: {
			type: Object,
			default: null
		}
	}
}
</script>