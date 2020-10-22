<template>
  <main> 
    <v-form>
      <password-input secondary/>
      <div style="height: 20px"></div> 


      <confirmation-input v-confirm="'password'"/>
      <div style="height: 20px"></div> 

      <button style="background-color: blue; padding: 20px;"/>
    </v-form>
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
    //EmailInput,
    VForm,
    //VInput,
  },

  data() {
    return {

    }
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>