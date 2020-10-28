<template>
	<section class="filter container">
		<div class="filter__body">
			
			<div class="filter__search">
				<input type="text" placeholder="search">
			</div>

			<button 
				v-if="toggleButtonShown"
				class="filter__shrink-button"
				@click="toggleFilters">
				tags
			</button>

			<div class="filter__tags">
				<div 
					class="tags"
					ref="tagsBody">

					<button 
						class="tag"
						type="button"
						v-for="({label}, index) of tags"
						:key="index">
						{{ label }}
					</button>
					
				</div>
			</div>

		</div>
	</section>
</template>

<script>

import bus from '@services/eventbus';
import Tags from '@models/Tags';
import HandleEvents from '@mixins/HandleEvents'
 

export default {
	mixins: [ HandleEvents ],

	data: function() {
		return {
			tags: [],

			wrapperHeight: 0,

			tagsShown: false,
		}
	},

	computed: {
		toggleButtonShown() {
			return Array.isArray(this.tags) && this.tags.length > 0; 
		}
	},

	mounted() {
		Tags.all().then((tags) => {
			this.tags = tags;
		});

		this.listen({
			'tag-created': (event) => {
				this.tags.push(event.tag);
			}
		});
	},

	methods: {
		toggleFilters() {
			const SHOWING_TIME = 500;

			let tagsBody = this.$refs.tagsBody;
			
			this.tagsShown =  !!!this.tagsShown;
			this.wrapperHeight = tagsBody.offsetHeight + 'px';
			
			if (this.tagsShown)
			{
				clearTimeout( this.$options.hideTimer );

				this.$options.showTimer = setTimeout(() => {
					this.wrapperHeight = 'auto';
				}, SHOWING_TIME)
			}
			else    
			{
				clearTimeout( this.$options.showTimer );
				
				this.$options.hideTimer = setTimeout(() => {
					this.wrapperHeight = 0;
				}, 50)
			}
		}
	}
}
</script>

<style scoped>
	.filter__tags-wrapper {
		transition: height .5s, margin-top .5s;
		overflow: hidden;
	}

	.filter__tags-wrapper--active {
		margin-top: 12.5px;
	}

	.filter__tags {
		margin-top: 0;
	}
</style>