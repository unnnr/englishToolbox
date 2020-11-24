<template>
	<section class="filter container">
		<div class="filter__body">
			
			<div class="filter__search">
				<input type="text" placeholder="search">
			</div>

			<button 
				class="filter__shrink-button"
				:disabled="togglerDisabled"
				@click="toggleFilters">

				tags
			</button>

			<shrinkable 
				class="filter__tags"
				inner-class="tags"
				ref="shrinkable"
				shrinked-by-default>

				<tag
					v-for="({label, color}, index) of tags"
					:key="index"
					:label="label"
					:color="color"
					:always-colored="false"/>

			</shrinkable>
		</div>
	</section>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'
import Shrinkable from '@components/Shrinkable'
import Tags from '@models/Tags'
import Tag from '@components/tags/Tag'
import bus from '@services/eventbus'
 

export default {
	components: {
		Shrinkable,
		Tag
	},

	mixins: [ HandleEvents ],

	data() {
		return {
			tags: [],

			wrapperHeight: 0,

			tagsShown: false,
		}
	},

	computed: {
		togglerDisabled() {
			return !!!Array.isArray(this.tags) || this.tags.length === 0; 
		}
	},

	mounted() {
		Tags.all().then((tags) => {
			this.tags = tags;
		});

		this.listen({
			'tag-created': (event) => {
				this.tags.push(event.tag);
			},

			'tag-deleted': (event) => {
				let tag = this.find(event.tag.id);
				if (tag === null)
					return;

				let index = this.tags.indexOf(tag);
				this.tags.splice(index, 1);
			}
		});
	},

	methods: {
		find(id) {
			for (let tag of this.tags) {
				if (tag.id === id)
					return tag;
			}

			return null;
		},

		toggleFilters() {
			let shrinkable = this.$refs.shrinkable;
			if (!!!shrinkable)
				return;

			shrinkable.toggle();
		}
	}
}
</script>

<style>
	.filter__tags {
		margin-top: 0;
	}

	.filter__tags .tags {
		margin-top: 10px;
	}
</style>