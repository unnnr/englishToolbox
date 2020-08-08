<template>
    <div class="addition">
        <div class="addition__body">
            <div class="addition__wrapper">
                <video-editor hidden/>
                <video-presentor/>
            </div>
        </div>
    </div>
</template>

<script>
import VideoPresentor from "./VideoPresentor.vue";
import VideoEditor from "./VideoEditor.vue";

export default {
	name: "video-addition",

	components: {
    	VideoPresentor,
    	VideoEditor,
	},
};
</script>
