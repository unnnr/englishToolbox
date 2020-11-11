<template>
  <div class="profile__tab profile__editor">
    <h5 class="profile__tab-title heading-fifth">Your profile</h5>
   
    <button 
      class="profile__tab-button profile__tab-button--exit text-fifth"
      type="button">
      
      sign out
    </button>
 
    <v-form 
      ref="form"
      class="profile__tab-editor"
      :class="{'profile__editor--disabled': disabled}"
      secondary>

      <div class="profile__editor-header">
        <div class="profile__editor-image">
          <input type="file">
        </div>

        <h4 class="profile__editor-name heading-fourth">Your Name</h4>
        <button 
          class="profile__tab-button profile__tab-button--edit-profile text-fifth"
          type="button"
          @click="toggleEditing">
          
          edit profile
        </button>
      </div>

      <name-input 
        :disabled="disabled"/>

      <email-input 
        :disabled="disabled"/>

      <div class="profile__editor-footer">

        <password-input 
          class="input-group--password-new"
          autocomplete="new-password"
          :label="'New passoword'"/>

        <confirmation-input 
          v-confirm="'password'"
          autocomplete="new-password"/>
        
        <confirm-button/>
        
        <button 
          class="profile__tab-button profile__tab-button--delete-profile text-sixth"
          type="button">
          
          delete profile
        </button>
      </div>

    </v-form>
  </div>
</template>

<script>
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import NameInput from '@components/inputs/NameInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    ConfirmationInput,
    ConfirmButton,
    PasswordInput,
    EmailInput,
    NameInput,
    VForm,
  },

  data() {
    return {
      disabled: true
    }
  },

  methods: {
    toggleEditing() {
      this.disabled = !!!this.disabled;

      let form = this.$refs.form;
      if (!!!form)
        return;

      form.reset();
    }
  }
}
</script>