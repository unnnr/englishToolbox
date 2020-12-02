<template>
  <v-form 
    class="i-recommend__card i-recommend__card--editor"
    :request="request"
    secondary>

    <recommendation-thumbnail/>

    <title-input 
      class="i-recommend__card-title-input"/>

    <description-input 
      class="i-recommend__card-textarea"
      :autoGrow="false"
      required/>

    <link-input 
      class="i-recommend__card-link-input"/>

    <confirm-button
       class="i-recommend__card-button"/>

    </v-form>
</template>

<script>
import RecommendationThumbnail from '@components/inputs/RecommendationThumbnail'
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import TitleInput from '@components/inputs/TitleInput'
import LinkInput from '@components/inputs/LinkInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    RecommendationThumbnail,
    DescriptionInput,
    ConfirmButton,
    TitleInput,
    LinkInput,
    VForm
  },

  props: {
    request: { type: Function, default: null }
  }
}
</script>