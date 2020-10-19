<template>
  <main> 
    <validating-input 
      placeholder="some plc"
      label="Password"
      type="password"/>

    <div style="height: 20px"></div> 

    <validating-input 
      placeholder="some plc"
      label="Email"
      type="email"/>

    <div style="height: 20px"></div> 

    <validating-input 
      placeholder="some plc" 
      label="Without icon"
      type="empty"/>

  </main>
</template>

<script>

import ValidatingInput from '@components/ValidatingInput'

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