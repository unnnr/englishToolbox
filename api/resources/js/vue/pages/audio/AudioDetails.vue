<template>
  <post-details
		@editor:showing="showEditor"
		@editor:hidding="hideEditor"
		@target:changed="setTarget">

        <transition name="fade">
 			<audio-editor 
				v-if="editing" 
			 	:target="target">
 			</audio-editor>
		</transition>
    </post-details>
</template>

<script>
import bus from '@services/eventbus';
import AudioEditor from "@pages/audio/AudioEditor.vue";
import PostDetails from '@components/posts/PostDetails'

export default {
	name: "audio-details",

	components: {
    	PostDetails,
    	AudioEditor,
    },
    
	data: function () {
		return {
			editing: true,
			target: null,
		}
	},

	methods: {
		setTarget(value) {
			this.target = value;
		},

		showEditor() {
			this.editing = true;
		},

		hideEditor() {
			this.editing = false;
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