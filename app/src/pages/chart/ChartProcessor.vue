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

      <h6 class="editor__tag-title heading-sixth">Upload files</h6>

       <image-input 
          :optional="editing"
          @change="udpateImage"/>

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
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TitleInput from '@components/inputs/TitleInput'
import ImageInput from '@components/inputs/ImageInput'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'

export default {
   components: {
    ConfirmButton,
    DeleteButton,
    TagsEditor,
    TitleInput,
    ImageInput,
    VForm
  },

  mixins: [ HandlePostProcessing ],

  computed: {
    title() {
      return this.withDefault ? this.target.title : '';
    }
  },

  beforeDestroy() {
    this.clearPreview()
  },

  methods: {
    clearPreview() {
      if (this.$options.image)
        URL.revokeObjectURL(this.$options.image)

      bus.dispatch('preview-changed', {
        image: null,
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

    async submit(data) {
      if (!!!this.request)
        return;

      await this.request(data);
      this.clearPreview();
    }
  }
}
</script>