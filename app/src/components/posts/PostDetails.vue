<template>
	<div 
		class="addition"
		ref="details">

		<div class="addition__body">
			<div class="addition__wrapper" ref="wrapper">

				<slot 
					v-if="editor.shown"
					:target="editor.target"/>

				<post-presentor 
					ref="presentor"
					v-else
					:target="info.target"/>
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

	mixins: [ HandleEvents ],

	data: function() {
		return {
			info: {
				target: null
			},

			editor: {
				target: null, 
				shown: false
			}
		}
	},

	mounted() {
		this.listen({
			'post-editing': (event) => {
				Object.assign(this.editor, {
					target: event.post,
					shown: true
				});

				if (!!!event.preventScrolling)
					this.scrollOnEditing();
			},

			'post-edited': (event) => {
				Object.assign(this.editor, {
					target: null,
				});
			},

			'post-creating': (event) => {
				Object.assign(this.editor, {
					target: null,
					shown: true
				});

				if (!!!event.preventScrolling)
					this.scrollOnEditing();	
			},

			'post-selecting': (event) => {
				Object.assign(this, {
					editor: { shown: false },
					info: { target: event.post }
				});

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