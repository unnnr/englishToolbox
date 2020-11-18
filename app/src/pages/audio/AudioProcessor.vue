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
      <div class="input-group-secondary">  
        <div class="input-group__inner">
          <span class="input-group__title">Audio title<small class="input-group__counter">0/0</small></span>
          <input class="input-group__input"  type="text">
        </div>
      </div>

      <description-input 
        :default-value="description"/>

      <h6 class="editor__tag-title heading-sixth">Upload files</h6>

      <div class="editor__upload-inputs">

        <div class="input-group-secondary input-group--upload input-group--audio">  
          <div class="input-group__inner">
            <span class="input-group__title">audio</span>
            <input class="input-group__input"  type="file">
          </div>
        </div>

        <div class="input-group-secondary input-group--upload input-group--image">  
          <div class="input-group__inner">
            <span class="input-group__title">image</span>
            <input class="input-group__input"  type="file">
          </div>
        </div>
        
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
import YoutubeUrlInput from '@components/inputs/YoutubeUrlInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'

export default {
   components: {
    DescriptionInput,
    ConfirmButton,
    DeleteButton,
    TagsEditor,
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
    }
  },

  methods: {
    hasChanges() {
      let form = this.$refs.form;

      return form.hasChanges();
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