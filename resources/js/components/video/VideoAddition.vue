<template>
    <div class="addition">
        <div class="addition__body">
            <div class="addition__wrapper" ref="wrapper">
				<transition name="fade">
 					<video-editor 
						v-if="editing" 
						ref="editor"
					/>
				</transition>
                <video-presentor ref="presentor"/>
            </div>
        </div>
    </div>
</template>

<script>
import VideoPresentor from "./VideoPresentor.vue";
import VideoEditor from "./VideoEditor.vue";
import bus from '../../eventbus';

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
		bus.listen('post-creating', event => {
			this.editing = true;
		});

		bus.listen('post-selected', event => {

			let presentor = this.$refs.presentor;
			let post = event.post;

			this.editing = false;

			presentor.updateInfo({
				title: post.title,
				description: post.description
			});

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