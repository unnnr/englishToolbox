<template>
  <v-form 
    class="addition__tab editor"
    ref="form"
    :request="submit"
    secondary>

    <div class="addition__tab-header">
      <h6 class="heading-sixth">Video editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
      
      <youtube-url-input 
        :default-value="link"
        :focusOnMount="!!!editing"
        @changed="updatedLink"/>

      <description-input 
        :default-value="description"/>

      <tags-editor/>
    </div>
    <div class="addition__tab-footer editor__footer">
      <delete-button  
        v-if="editing"
        class="editor__delete-button"
        @click.native="prepareDeletion"/>
        
      <confirm-button class="editor__confirm-button"/>
    </div>
  </v-form>
</template>

<script>
// services
import bus from '@services/eventbus'

// mixins
import HandlePostProcessing from '@mixins/HandlePostProcessing'

// components
import DescriptionInput from '@components/inputs/DescriptionInput'
import YoutubeUrlInput from '@components/inputs/YoutubeUrlInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'


export default {
  components: {
    DescriptionInput,
    YoutubeUrlInput,
    ConfirmButton,
    DeleteButton,
    TagsEditor,
    VForm
  },
  
  mixins: [ HandlePostProcessing ],
  
  data() {
    return {
      link: ''
    }
  },

  computed: {
    description() {
      return this.withDefault ? this.target.description : '';
    }
  },

  mounted() {
    this.link = this.withDefault ?  
      'https://youtube.com/watch?v=' + this.target.youtubeId : '';
  },

  beforeDestroy() {    
    bus.dispatch('preview-changed', { videoId: null });
  },

  methods: {
    updatedLink(event) {
      let videoId = event.videoId || null;
      bus.dispatch('preview-changed', { videoId });
    },

    async submit(data) {
      if (!!!this.request)
        return;
      
      await this.request(data);
      bus.dispatch('preview-changed', { videoId: null });
    }
  }
}
</script>