<template>
  <main> 
    <v-form :request="send">

      <password-input optional/>
      <div style="height: 20px"></div> 

      <confirmation-input v-confirm="'password'" optional/>
      <div style="height: 20px"></div> 

      <description-input name="not" /> 
      <div style="height: 20px"></div> 

      <v-file name="some" icon="audio"  v-validate optional/>
      <div style="height: 20px"></div> 

      <v-button v-validate/>
    </v-form>
  </main>
</template>

<script>

import ConfirmationInput from '@components/inputs/ConfirmationInput'
import DescriptionInput from '@components/inputs/DescriptionInput'
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import VButton from '@components/validation/VButton'
import VInput from '@components/validation/VInput'
import VForm from '@components/validation/VForm'
import VFile from '@components/validation/VFile'


export default {
  components: {
    PasswordInput,
    ConfirmationInput,
    DescriptionInput,
    VButton,
    VFile,
    VForm,
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