<template>
  <main> 
    <v-form>
      <email-input v-validate/>
      <div style="height: 20px"></div> 


      <password-input v-validate/>
      <div style="height: 20px"></div> 


      <password-input v-name="'password'" v-validate/>

      <div style="height: 20px"></div> 


      <confirmation-input v-confirm="'password'"/>

    </v-form>

    <button style="background-color: blue; padding: 20px;" @click="show = false">
    </button>

  </main>
</template>

<script>

import PasswordInput from '@components/validation/PasswordInput'
import ConfirmationInput from '@components/validation/ConfirmationInput'
import EmailInput from '@components/validation/EmailInput'
import VInput from '@components/validation/VInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    PasswordInput,
    ConfirmationInput,
    EmailInput,
    VForm,
    //VInput,
  },

  data() {
    return {
      show: true
    }
  },

  mounted() {
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>