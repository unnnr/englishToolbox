<template>
   <v-form 
    class="addition__tab editor"
    :request="request"
    secondary>

    <div class="addition__tab-header">
      <h6 class="heading-sixth">Video editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
      
      <youtube-url-input/>

      <description-input/>

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
    editing: { type: Boolean, default: false }
  },

  methods: {
    request(data) {
      console.log('sending....');
    }
  }
}
</script>