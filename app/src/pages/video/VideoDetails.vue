<template>
  <post-details :model="model">

		<template v-slot="data"> 
			<transition name="fade">

				<video-editor 
					:editing="data.editing"
					:target="data.target" 
		 			ref="editor">
 				</video-editor>
				 
			</transition>
		</template>
			
  </post-details>
</template>

<script>

import PostDetails from '@components/posts/PostDetails'
import VideoEditor from '@pages/video/VideoEditor'
import Video from '@models/Videos'

export default {
	components: {
		PostDetails,
    VideoEditor
	},

	computed: {
		model: () => Video
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