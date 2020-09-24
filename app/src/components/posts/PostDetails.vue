<template>
	<div 
		class="addition"
		ref="details">

		<div class="addition__body">
			<div class="addition__wrapper" ref="wrapper">

				<slot 
					v-if="editing"
					target="target"/>

				<post-presentor 
					ref="presentor"
					v-else
					:target="target"/>
			</div>
		</div>
	</div>
</template>

<script>

import HandleEvents from '@mixins/HandleEvents'
import PostPresentor from "@components/posts/PostPresentor.vue"
import bus from '@services/eventbus'

export default {
	components: {
		PostPresentor,
	},

	mixins: [ HandleEvents, HandleEvents],

	data: function() {
		return {
			editing: false,
			target: null
		}
	},

	mounted() {
		this.listen({
			'post-editing': (event) => {
				this.target = event.post;

				this.editing = true;

				if (!!!event.preventScrolling)
					this.scrollOnEditing();
			},

			'post-edited': (event) => {
				this.target = null;
			},

			'post-creating': (event) => {
				this.editing = true;

				if (!!!event.preventScrolling)
					this.scrollOnEditing();	
			},

			'post-selecting': (event) => {
				this.editing = false;
				this.target = event.post;

				bus.dispatch('post-selected', event);
			}
		});
	},

	methods: {
		scrollToDetails() {
			function getElementDistanceToTop(element) {
				if (!!!element)
					return 0;

				return element.offsetTop + getElementDistanceToTop(element.offsetParent); 
			}

			const SHIFT = 10;

			let details = this.$refs.details;

			let elementHeight = details.offsetHeight;

			let viewportHeight = window.innerHeight;
			
			let distanceToTop = getElementDistanceToTop(details);

			let distance = elementHeight +  distanceToTop - viewportHeight;
						
			window.scrollTo({
					top: distance ,
					behavior: 'smooth' 
				}) 
			},
			
		scrollOnEditing() {
			const RENDER_TIME = 100;
			
			// Gives DOM time to update and render editor form
			setTimeout(this.scrollToDetails, RENDER_TIME);
		}
	}
};
</script>