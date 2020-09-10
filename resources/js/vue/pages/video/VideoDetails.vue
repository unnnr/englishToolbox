<template>
    <post-details
		@editor:showing="showEditor"
		@editor:hidding="hideEditor"
		@target:changed="setTarget">

		<transition name="fade">
 			<video-editor 
			 	ref="editor"
				v-show="editing" 
				:target="target">
 			</video-editor>
		</transition>
    </post-details>
</template>

<script>
import bus from '@services/eventbus'
import VideoEditor from "@pages/video/VideoEditor"
import PostDetails from '@components/posts/PostDetails'

export default {
	name: "video-details",

	components: {
		PostDetails,
    	VideoEditor
	},

	data: function () {
		return {
			editing: false,
			target: null
		}
	},


	methods: {
		setTarget(value) {
			this.target = value;
		},

		showEditor() {
			console.log(12);
			this.editing = true;
		},

		hideEditor() {
			this.editing = false;
		}
	}
};
</script>

<style scoped>
	.fade-leave-active {
		position: absolute;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .7s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>