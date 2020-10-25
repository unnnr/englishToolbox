<template>
  <main> 
    <v-form :request="send">
      
      <password-input optional secondary/>
      <div style="height: 20px"></div> 

      <confirmation-input v-confirm="'password'"/>
      <div style="height: 20px"></div> 

      <v-textarea name="not" v-validate/> 
      <div style="height: 20px"></div> 

      <v-file name="some" icon="audio"  v-validate/>
      <div style="height: 20px"></div> 

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
    send(data) {
      return new Promise(resolve => setTimeout(() =>  resolve(), 3000));
    }
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>