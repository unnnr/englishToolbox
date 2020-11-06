<template>
   <v-form 
    class="addition__tab editor"
    ref="form"
    :request="request"
    secondary>

    <div class="addition__tab-header">
      <h6 class="heading-sixth">Video editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
      
      <youtube-url-input 
        :default-value="link"
        @changed="updatedLink"/>

      <description-input :default-value="description"/>

      <tags-editor ref="tagEditor"/>
    </div>
    <div class="addition__tab-footer editor__footer">
      <delete-button  
        class="editor__delete-button"
        v-if="editing"/>
        
      <confirm-button class="editor__confirm-button"/>
    </div>
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
    YoutubeUrlInput,
    ConfirmButton,
    DeleteButton,
    TagsEditor,
    VForm
  },

  props: {
    editing: { type: Boolean, default: false },

    request: { type: Function, default: null },
  },

  inject: [ '$target' ],

  data() {
    return {
      link: ''
    }
  },

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

    tagsCounter() {
      let tagEditor = this.$refs.tagEditor;
      if (!!!tagEditor)
        return '';

      return tagEditor.counter;
    }
  },

  mounted() {
    this.link = this.withDefault ?  
      'https://youtube.com/watch?v=' + this.target.videoId : '';
  },

  methods: {
    updatedLink(event) {
      let videoId = event.videoId || null;
      
      if (typeof this.target === 'object')
        this.$set(this.target, 'videoId', videoId) 
    },

    hasChanges() {
      let form = this.$refs.form;

      return form.hasChanges();
    }
  }
}
</script>