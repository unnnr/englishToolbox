<template>
   <div class="addition__info">
        <div class="addition__header">
        	<button class="addition__header-button addition__header-button--active text-fourth">Description</button>
        	<button class="addition__header-button text-fourth">Comments</button>
        </div>
    
        <div class="addition__tabs">
  
            <div class="addition__tab addition__tab--description">
              <video-info ref="videoInfo"/>
            </div>
            
            <div class="addition__tab addition__tab--comments">
                <comments/>
            </div>
  
        </div>
    </div>
</template>

<script>
import VideoInfo from './VideoInfo.vue';
import Comments from '../Comments';

export default {
    name: 'video-presentor',

  	methods: {
		updateInfo(newData) {
			let info = this.$refs.videoInfo;

			Object.assign(info.$data, newData)
		}
	},

    components: {
        VideoInfo,
        Comments
    }
}
</script>
