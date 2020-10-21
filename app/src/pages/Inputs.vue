<template>
  <main> 
    <v-form>
      <password-input  v-if="show"/>
      <div style="height: 20px"></div> 


      <confirmation-input v-if="showB" v-confirm="'password'"/>
      <div style="height: 20px"></div> 

    </v-form>

    <button style="background-color: blue; padding: 20px;" @click="toggle">
    </button>

      <button style="background-color: maroon; padding: 20px;" @click="toggleB">
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
    //EmailInput,
    VForm,
    //VInput,
  },

  data() {
    return {
      show: true,
      showB: true
    }
  },

  mounted() {
  },

  methods: {
    toggle() {
      this.show = !!!this.show;
    },

    toggleB() {
      this.showB  = !!!this.showB;
    }
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>