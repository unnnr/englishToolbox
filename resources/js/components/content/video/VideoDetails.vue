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
		});

		bus.listen('post-creating', event => {
			
			this.editing = true;
		});

		bus.listen('post-selecting', event => {
			this.editing = false;
		});	
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