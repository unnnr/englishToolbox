<template>
  <main> 
    <validating-input 
      placeholder="some plc"
      label="Password"
      icon="password"/>

    <div style="height: 20px"></div> 

    <validating-input 
      placeholder="some plc"
      label="Email"
      icon="email"/>

    <div style="height: 20px"></div> 

    <validating-input 
      placeholder="some plc" 
      label="Without icon"/>

  </main>
</template>

<script>

import ValidatingInput from '@components/validation/VInput'

export default {
  components: {
    ValidatingInput
  }
}
</script>

<style lang="sass">
  
main
  padding: 20px 100px

</style>