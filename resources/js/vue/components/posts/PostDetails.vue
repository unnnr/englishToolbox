<template>
    <div 
		class="addition"
		ref="details">

        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<slot></slot>
                <post-presentor 
                    ref="presentor"
                    v-if="presentorShown"/>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@services/eventbus'
import PostPresentor from "@components/posts/PostPresentor.vue"

export default {
	name: "post-details",

	components: {
        PostPresentor,
    },

    data: function() {
        return {
            presentorShown: true
        }
    },

	mounted() {
		bus.listen('post-editing', this.onPostEditing);

		bus.listen('post-edited', this.onPostEdited);

		bus.listen('post-creating', this.onPostCreating);

		bus.listen('post-selecting', this.onPostSelecting);	
    },
    
    beforeDestroy() {
		bus.detach('post-editing', this.onPostEditing);

		bus.detach('post-edited', this.onPostEdited);

		bus.detach('post-creating', this.onPostCreating);

		bus.detach('post-selecting', this.onPostSelecting);	
    },

    methods: {
        // Global  event lintenrs

        onPostEdited() {
            this.$emit('target:changed', null);
        },

        onPostEditing(event) {
            this.$emit('target:changed', event.post);
            this.$emit('editor:showing');

            this.presentorShown = false;

			if (!!!event.preventScrolling)
				this.scrollOnEditing();
        },  

        onPostSelecting(event) {
            this.$emit('editor:hidding');

            this.presentorShown = true;
        },

        onPostCreating() {
            this.$emit('editor:showing');

            this.presentorShown = false;

			if (!!!event.preventScrolling)
				this.scrollOnEditing();	
        },

        // Defaul methods
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
        /*     
			window.scrollTo({
            	top: distance ,
            	behavior: 'smooth' 
            }) */
        },
        
        scrollOnEditing() {
            const RENDER_TIME = 100;
            
            // Gives DOM time to update and render editor form
            setTimeout(this.scrollToDetails, RENDER_TIME);
        }
	}
};
</script>