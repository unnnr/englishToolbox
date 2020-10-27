<template>
  <div class="addition">

    <div class="addition__header">
      <button 
        class="addition__button  text-fifth"
        :class="{'addition__button--active': infoSelected}"
        @click="selectInfo">

        Description
      </button>

      <button 
        class="addition__button text-fifth" 
        :class="{'addition__button--active': commentsSelected}"
        @click="selectComments">

        Comments
      </button>

      <!-- The editor can be hidden when the user -->
      <!-- doesn't have appropriate permissions   -->
      <button 
        class="addition__button text-fifth"
        v-if="editorShown"
        :class="{'addition__button--active': editorSelected}"
        @click="selectEditor">

        Editor
      </button>

      <!-- TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP  -->
      <button 
        class="addition__button text-fifth" 
        :class="{'addition__button--active': activeTab === 'video'}"
        @click="activeTab = 'video'">
        
        __Video
      </button>

      <button 
        class="addition__button text-fifth" 
         :class="{'addition__button--active': activeTab === 'chart'}"
        @click="activeTab = 'chart'">

        __Chart
      </button>

      <button 
        class="addition__button text-fifth" 
        :class="{'addition__button--active': activeTab === 'audio'}"
        @click="activeTab = 'audio'">
        
        __Auido
      </button>


    </div>

    <div class="addition__tabs">

      <post-info v-if="infoSelected"/>

      <post-comments v-if="commentsSelected"/>
      
      <slot  v-if="editorShown && editorSelected"/>

      <temp-video v-if="activeTab === 'video'"/>
      
      <temp-chart v-if="activeTab === 'chart'"/>

      <temp-audio v-if="activeTab === 'audio'"/>
    </div>
  </div>
</template>

<script>

import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'

import TempVideo from '@pages/video/VideoEditor'
import TempAudio from '@pages/audio/AudioEditor'
import TempChart from '@pages/chart/ChartEditor'


export default {
  components: {
    PostComments,
    PostInfo,

    TempVideo,
    TempAudio,
    TempChart
  },

  data() {
    return {
      activeTab: 'info'
    }
  },

  computed: {
    infoSelected() {
      return this.activeTab === 'info';
    },

    commentsSelected() {
      return this.activeTab === 'comments';
    },

    editorSelected() {
      return this.activeTab === 'editor';
    },
    
    editorShown() {
      return true;
    }
  },

  methods: {
    selectInfo() {
      this.activeTab = 'info';
    },

    selectComments() {
      this.activeTab = 'comments';
    },

    selectEditor() {
      console.log(this.$slots);

      this.activeTab = 'editor';
    }
  }
}
</script>