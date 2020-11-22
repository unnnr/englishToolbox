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
          :optional="editing" 
          @change="updateAudio"/>

        <image-input 
          :optional="editing"
          @change="udpateImage"/>
      </div>

      <tags-editor/>
    </div>
    <div class="addition__tab-footer editor__footer">
      <delete-button  
        v-if="editing"
        class="editor__delete-button"
        @click.native="deleteAudio"/>
        
      <confirm-button class="editor__confirm-button"/> </div>
  </v-form>
</template>

<script>
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TitleInput from '@components/inputs/TitleInput'
import ImageInput from '@components/inputs/ImageInput'
import AudioInput from '@components/inputs/AudioInput'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'
import bus from '@services/eventbus'

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

  props: {
    editing: { type: Boolean, default: false },

    request: { type: Function, default: null },

    deleting: {type: Function, default: null }
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    withDefault() {
      return this.target && this.editing;
    },

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
    hasChanges() {
      let form = this.$refs.form;

      return form.hasChanges();
    },

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
      });    },

    async submit(data) {
      if (this.request)
        await this.request(data);
      
      this.clearPreview();
    },

    async deleteAudio() {
      function okay() {
        if (typeof _this.deleting !== 'function')
          return;

        let form = _this.$refs.form;
        if (!!!form)
          return;

        form.sendWith(async () => {
          let post = _this.target;
          await _this.deleting(post);

          bus.dispatch('post-deleting', { post })
        });
      }

      let _this = this;

      
      bus.dispatch('alert-warning', { 
        okay, message: 'It cannot be restored in the future',
      });
    }
  }
}
</script>