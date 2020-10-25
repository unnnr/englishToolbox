<template>
  <main> 
    <v-form :request="send">
      <password-input optional secondary/>
      <div style="height: 20px"></div> 


      <confirmation-input v-confirm="'passwords'"/>
      <div style="height: 20px"></div> 

      <div style="height: 20px"></div> 
      <v-textarea /> 

      <v-file/>

      <button style="background-color: blue; padding: 20px;"/>
    </v-form>
  </main>
</template>

<script>

import PasswordInput from '@components/validation/PasswordInput'
import ConfirmationInput from '@components/validation/ConfirmationInput'
import EmailInput from '@components/validation/EmailInput'
import VTextarea from '@components/validation/VTextarea'
import VInput from '@components/validation/VInput'
import VForm from '@components/validation/VForm'
import VFile from '@components/validation/VFile'

export default {
  components: {
    PasswordInput,
    ConfirmationInput,
    //EmailInput,
    VForm,
    //VInput,
    VTextarea,
    VFile
  },

  data() {
    return {

    }
  },

  methods: {
    send() {
      return new Promise(resolve => setTimeout(() => {console.log(12); resolve()}, 3000));
    }
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>