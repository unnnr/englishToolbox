<template>
    <div class="addition">
        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<transition name="fade">
 					<video-editor 
					 	ref="editor"
						v-show="editing" 
						:type="editorType"/>
				</transition>
                <post-presentor ref="presentor"/>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@services/eventbus';
import VideoEditor from "@components/content/video/VideoEditor.vue";
import PostPresentor from "@components/content/PostPresentor.vue";

export default {
	name: "video-details",

	data: function () {
		return {
			editing: false,
			editorType: 'creating',
		}
	},

	components: {
    	PostPresentor,
    	VideoEditor,
	},

	mounted() {
		bus.listen('post-editing', event => {
			this.editing = true;	

			if (!!!event.preventScrolling)
				this.scrolleToDetails();
		});

		bus.listen('post-creating', event => {
			
			this.editing = true;

			if (!!!event.preventScrolling)
				this.scrolleToDetails();	
		});

		bus.listen('post-selecting', event => {
			this.editing = false;
		});	
	},

	methods: {

		scrolleToDetails() {
            const SHIFT = 10;

            let details = this.$refs.details;

            let relatedTop = details.getBoundingClientRect().top;
            let distance  = relatedTop - SHIFT;

			if (relatedTop < 0)
            	window.scrollBy({
            	    top: distance ,
            	    behavior: 'smooth' 
            	})
        }
	}
};
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 1s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>