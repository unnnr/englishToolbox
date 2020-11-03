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

      <h6 class="editor__tag-title heading-sixth">Add tags<span class="editor__tag-counter">0/5</span></h6>

      <div class="tags">
        <button type="button" class="tag">consectetur</button>
        <button type="button" class="tag">adipiscing</button>
        <button type="button" class="tag">petronat</button>
        <button type="button" class="tag">derber</button>
        <button type="button" class="tag">doits</button>
        <button type="button" class="tag">tetrat</button>
        <button type="button" class="tag">fonter</button>
        <button type="button" class="tag">petrelet</button>
        <button type="button" class="tag">huynia</button>
      </div>


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
import VForm from '@components/validation/VForm';

export default {
  components: {
    DescriptionInput,
    YoutubeUrlInput,
    ConfirmButton,
    DeleteButton,
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