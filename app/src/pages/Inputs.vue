<template>
  <main> 

 

    <password-input />

    <div style="height: 20px"></div> 

    <email-input />

    <div style="height: 20px"></div> 

    <v-input 
      placeholder="some plc" 
      label="Without icon"/>

  </main>
</template>

<script>

import PasswordInput from '@components/validation/PasswordInput'
import EmailInput from '@components/validation/EmailInput'
import VInput from '@components/validation/VInput'


export default {
  components: {
    PasswordInput,
    EmailInput,
    VInput,
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>