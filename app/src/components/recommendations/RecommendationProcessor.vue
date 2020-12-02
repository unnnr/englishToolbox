<template>
  <v-form 
    class="i-recommend__card i-recommend__card--editor"
    secondary>

    <div class="i-recommend__card-image i-recommend__card-image i-recommend__card-image--loaded">
      <input type="file">
    </div>

    <title-input 
      class="i-recommend__card-title-input"/>

    <description-input 
      class="i-recommend__card-textarea"/>

    <link-input 
      class="i-recommend__card-link-input"/>

    <confirm-button
       class="i-recommend__card-button"/>

    </v-form>
</template>

<script>
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import TitleInput from '@components/inputs/TitleInput'
import LinkInput from '@components/inputs/LinkInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    DescriptionInput,
    ConfirmButton,
    TitleInput,
    LinkInput,
    VForm
  },
}
</script>