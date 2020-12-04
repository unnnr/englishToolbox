<template>
   <v-form 
    class="addition__tab editor"
    ref="form"
    :request="request"
    secondary>

    <div class="addition__tab-header">
      <h6 class="heading-sixth">Audio editor</h6>
    </div>

    <div class="addition__tab-body editor__body">
      <title-input
        :focusOnMount="!!!editing"
        :default-value="title"/>

      <description-input 
        :default-value="description"/>

      <h6 class="editor__tag-title heading-sixth">Upload files</h6>

      <div class="editor__upload-inputs">
        <audio-input
          :name="'audioFile'"
          :optional="editing" 
          @change="updateAudio"/>

        <image-input 
          :name="'imageFile'"
          :optional="editing"
          @change="udpateImage"/>
      </div>

      <tags-editor/>
    </div>
    <div class="addition__tab-footer editor__footer">
      <delete-button  
        v-if="editing"
        class="editor__delete-button"
        @click.native="prepareDeletion"/>
        
      <confirm-button class="editor__confirm-button"/> </div>
  </v-form>
</template>

<script>
// services
import bus from '@services/eventbus'

// mixins
import HandlePostProcessing from '@mixins/HandlePostProcessing'

//components
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TitleInput from '@components/inputs/TitleInput'
import ImageInput from '@components/inputs/ImageInput'
import AudioInput from '@components/inputs/AudioInput'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'

export default {
   components: {
    DescriptionInput,
    ConfirmButton,
    DeleteButton,
    TagsEditor,
    TitleInput,
    ImageInput,
    AudioInput,
    VForm
  },

  mixins: [ HandlePostProcessing ],

  computed: {
    description() {
      return this.withDefault ? this.target.description : '';
    },

    title() {
      return this.withDefault ? this.target.title : '';
    }
  },

  beforeDestroy() {
    this.clearPreview()
  },

  methods: {
    clearPreview() {
      if (this.$options.audio)
        URL.revokeObjectURL(this.$options.audio)

      if (this.$options.image)
        URL.revokeObjectURL(this.$options.image)

      bus.dispatch('preview-changed', {
        image: null,
        audio: null,
      });
    },

    udpateImage(image) {
      // Removing saved image
      if (this.$options.image)
        URL.revokeObjectURL(this.$options.image)

      let ulrObject  = URL.createObjectURL(image);

      // Saving for revoking in futurne
      this.$options.image = ulrObject;

      bus.dispatch('preview-changed', {
        image: ulrObject
      });
    },

    updateAudio(audio) {
     // Removing saved image
      if (this.$options.audio)
        URL.revokeObjectURL(this.$options.audio)

      let ulrObject  = URL.createObjectURL(audio);

      // Saving for revoking in futurne
      this.$options.audio = ulrObject;

      bus.dispatch('preview-changed', {
        audio: ulrObject
      });   
    },

    async submit(data) {
      if (!!!this.request)
        return;

      await this.request(data);
      this.clearPreview();
    }
  }
}
</script>