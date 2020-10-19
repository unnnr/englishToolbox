<template>
  <main> 
    <validating-input 
      type="password"
      placeholder="some plc"
      label="My title"/>
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