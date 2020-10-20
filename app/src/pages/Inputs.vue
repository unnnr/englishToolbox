<template>
  <main> 
    <v-form>
      <email-input v-validate/>
      <div style="height: 20px"></div> 

      <password-input  v-if="show" v-name="'password'" v-validate/>

      <div style="height: 20px"></div> 


      <confirmation-input v-confirm="'password'"/>

    </v-form>

    <button style="background-color: blue; padding: 20px;" @click="toggle">
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
      show: true,
      someee: false
    }
  },

  mounted() {
  },

  methods: {
    toggle() {
      this.show = !!!this.show;
      if (this.show)
        this.someee = 'false'
      else  
      this.someee ='true';
    }
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>