<template>
   <div class="addition__info">
        <div class="addition__header">
        	<button class="addition__header-button addition__header-button--active text-fourth">Description</button>
        	<button class="addition__header-button text-fourth">Comments</button>
        </div>
    
        <div class="addition__tabs">
  
            <div class="addition__tab addition__tab--description">
              <video-info/>
            </div>
            
            <div class="addition__tab addition__tab--comments">
                <comments/>
            </div>
  
        </div>
    </div>
</template>

<script>
import VideoInfo from './VideoInfo.vue';
import Comments from '../Comments.vue';

export default {
    name: 'video-presentor',

    data: function () {
        return {
            title: 'Lorem ipsum dolor',
            date: 'April 17 2020',
            link: 'YouTube link',
            views: 1289,
            description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                           dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas
                           congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.`
        }
    },

    components: {
        VideoInfo,
        Comments
    }
}
</script>
