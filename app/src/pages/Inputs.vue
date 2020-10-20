<template>
  <main> 
    <v-input 
      placeholder="some plc"
      label="Password"
      icon="password"/>

    <div style="height: 20px"></div> 

    <v-input 
      placeholder="some plc"
      label="Email"
      icon="email"/>

    <div style="height: 20px"></div> 

    <v-input 
      placeholder="some plc" 
      label="Without icon"/>

    <password-input />

  </main>
</template>

<script>

import PasswordInput from '@components/validation/PasswordInput'
import VInput from '@components/validation/VInput'


export default {
  components: {
    VInput,
    PasswordInput
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>