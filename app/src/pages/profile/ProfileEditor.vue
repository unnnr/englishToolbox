<template>
  <div class="profile__tab profile__editor">
    <h5 class="profile__tab-title heading-fifth">Your profile</h5>
   
    <button class="profile__tab-button profile__tab-button--exit text-fifth">sign out</button>
 
    <v-form class="profile__tab-editor profile__editor--disabled" secondary>

      <div class="profile__editor-header">
        <div class="profile__editor-image">
          <input type="file">
        </div>
        <h4 class="profile__editor-name heading-fourth">Your Name</h4>
        <button class="profile__tab-button profile__tab-button--edit-profile text-fifth">edit profile</button>
      </div>

      <name-input disabled/>

      <email-input disabled/>

      <div class="profile__editor-footer">

        <password-input 
          class="input-group--password-new"
          autocomplete="new-password"/>

        <confirmation-input 
          v-confirm="'password'"
          autocomplete="new-password"/>
        

        <button class="button-secondary">confirm</button>
        <button class="profile__tab-button profile__tab-button--delete-profile text-sixth">delete profile</button>
      </div>

    </v-form>
  </div>
</template>

<script>
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    ConfirmationInput,
    PasswordInput,
    EmailInput,
    NameInput,
    VForm,
  }
}
</script>