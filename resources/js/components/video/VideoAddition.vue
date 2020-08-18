<template>
    <div class="addition">
        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<transition name="fade">
 					<video-editor v-if="editing" 
								  ref="editor"/>
				</transition>
                <video-presentor ref="presentor"/>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@services/eventbus';
import VideoEditor from "@components/video/VideoEditor.vue";
import VideoPresentor from "@components/video/VideoPresentor.vue";

export default {
	name: "video-addition",

	data: function () {
		return {
			editing: true
		}
	},

	components: {
    	VideoPresentor,
    	VideoEditor,
	},

	mounted() {
		bus.listen('post-editing', event => {
			bus.dispatch('post-selecting', event);

			this.editing = true;
		});

		bus.listen('post-selecting', event => {

			let presentor = this.$refs.presentor;
			let post = event.post;

			this.editing = false;

			presentor.updateInfo({
				title: post.title,
				description: post.description,
				mainTag: post.mainTag,
				tags: post.tags
			});

			bus.dispatch('post-selected', event);
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