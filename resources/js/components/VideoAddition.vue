<template>
   <div class="addition">
    <div class="addition__wrapper">
      <div class="addition__body">
        <video-editor></video-editor>
        <video-info></video-info>
      </div>
    </div>
</template>

<script>

import VideoInfo from './VideoInfo';
import VideoEditor from './VideoEditor';


export default {
    name: 'video-addition',

    components: {
        VideoInfo,
        VideoEditor
    }
}
</script>
