<template>
	<section class="filter container">
		<div class="filter__body">

			<search
				@open="close"/>

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
					v-for="tag of parsed"
					:key="tag.id"
					:label="tag.label"
					:color="tag.color"
					:selected="tag.selected"
					:always-colored="false"
					@click.native="toggle(tag)"/>

			</shrinkable>
		</div>
	</section>
</template>

<script>
// services
import Tags from '@models/Tags'
import bus from '@services/eventbus'

// mixins
import HandleEvents from '@mixins/HandleEvents'

// components
import Tag from '@components/tags/Tag'
import Search from '@components/search/Search'
import Shrinkable from '@components/Shrinkable'

export default {
	components: {
		Shrinkable,
		Search,
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
		},

		parsed() {
			let parsed = [];

			for (let tag of this.tags)
			{
				if (!!!tag.default)
					parsed.push(tag);
			}

			return parsed;
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
		toggle(tag) {
			let filter = tag.id;

			if (tag.selected) {
				this.$set(tag, 'selected', false);
				bus.dispatch('filter-removed', { filter });
			}
			else {
				this.$set(tag, 'selected', true);
				bus.dispatch('filter-added', { filter });
			}
		},
		
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
		},

		close() {
			this.$refs.shrinkable.close();
		},
	}
}
</script>

<style lang="sass">

.filter__tags
	transition: all .4s

.filter__tags.shrinkable--closing,
.filter__tags.shrinkable--closed
	margin-top: 0

</style>