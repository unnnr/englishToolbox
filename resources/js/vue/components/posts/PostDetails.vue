<template>
    <div 
		class="addition"
		ref="details">

        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<slot></slot>
                <post-presentor ref="presentor"/>
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

			if (!!!event.preventScrolling)
				this.scrolleToDetails();
        },  

        onPostSelecting() {
            this.$emit('editor:hidding');
        },

        onPostCreating() {
            this.$emit('editor:showing');

			if (!!!event.preventScrolling)
				this.scrolleToDetails();	
        },

        // Defaul methods

		scrolleToDetails() {
            const SHIFT = 10;

            let details = this.$refs.details;

            let relatedTop = details.getBoundingClientRect().top;
            let distance = relatedTop - SHIFT;

			if (relatedTop < 0)
            	window.scrollBy({
            	    top: distance ,
            	    behavior: 'smooth' 
            	})
		}
	}
};
</script>