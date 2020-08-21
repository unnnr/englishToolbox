<template>
    <div class="addition">
        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<transition name="fade">
 					<audio-editor 
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
import AudioEditor from "@components/content/video/VideoEditor.vue";
import PostPresentor from "@components/content/PostPresentor.vue";

export default {
	name: "audio-details",

	components: {
    	PostPresentor,
    	AudioEditor,
    },
    
	data: function () {
		return {
			editing: false,
			editorType: 'creating',
		}
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