<template>
  <v-form 
    class="modal__content alert alert--recovery"
    secondary>

    <div class="alert__header">
      <span class="alert__title heading-fifth">Password recovery</span>
      <button 
        class="alert__button-close"
        type="button"
        @click="close">
      </button>
    </div>

    <p class="alert__description text-fifth">
      We sent the confirmation code to your email.
      <span>If you need to resend the code, <u @click="resendCode">click here</u>.</span>
      <!-- <span class="alert__description--resended">Confirmation code has been resended.</span> -->
    </p>

    <recovery-input/>

    <password-input
      class="input-group--password-new"
      without-autocomplete/>
      
    <confirmation-input 
      without-autocomplete
      v-confirm="'password'"/>

    <confirm-button
      class="button-primary"/>

  </v-form>
</template>

<script>
import ConfirmationInput from '@components/inputs/ConfirmationInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import RecoveryInput from '@components/inputs/RecoveryInput'
import PasswordInput from '@components/inputs/PasswordInput'
import VForm from '@components/validation/VForm'

export default {
  components: { 
    ConfirmationInput,
    ConfirmButton,
    RecoveryInput,
    PasswordInput,
    VForm,
  },

  data() {
    return {
      shown: true
    }
  },

  methods: {
    close() {
      this.$emit('close');
    },

    resendCode() {

    },

    async submit() {

    }
  }
}
</script>