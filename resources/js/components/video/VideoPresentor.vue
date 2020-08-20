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
import VideoInfo from '@components/video/VideoInfo.vue';
import Comments from '@components/Comments';
import bus from '@services/eventbus';

export default {
    name: 'video-presentor',

    components: {
        VideoInfo,
        Comments
    },

    mounted() {

        bus.listen('post-selecting', event => {

			let post = event.post;

			this.tags =  post.tags;
			this.title =  post.title;
			this.mainTag =  post.mainTag;
			this.description =  post.description;

			bus.dispatch('post-selected', event);
		});	
    },

  	methods: {
		updateInfo(newData) {
			let info = this.$refs.videoInfo;

			Object.assign(info.$data, newData)
		}
	}
}
</script>
