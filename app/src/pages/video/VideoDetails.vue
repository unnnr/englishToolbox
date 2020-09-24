<template>
  <post-details>

		<template v-slot:default="data"> 
			<transition name="fade">
				
				<video-editor 
					:target="data.target" 
		 			ref="editor">
 				</video-editor>

			</transition>
		</template>
			
  </post-details>
</template>

<script>

import VideoEditor from "@pages/video/VideoEditor"
import PostDetails from '@components/posts/PostDetails'

export default {
	components: {
		PostDetails,
    VideoEditor
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