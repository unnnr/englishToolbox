<template>
  <section class="selected container">
    <transition name="fade">
      <post-selected-overlay v-if="overlayShown"/>
    </transition>

    <post-player>
      <slot name="player"/>
    </post-player>
    
    <post-details 
      ref="postDetails"
      :only-editor="creating"
      @switching="trySwitch"> 

      <video-creator v-if="creating" ref="creator"/>
      
      <video-editor v-if="editing" ref="editor"/> 

    </post-details>
  </section>
</template>

<script>
import VideoCreator from '@pages/video/VideoCreator'
import VideoEditor from '@pages/video/VideoEditor'
import HandlePost from '@mixins/HandlePost'

export default {
  components: {
    VideoCreator,
    VideoEditor
  },

  mixins: [HandlePost]
}
</script>