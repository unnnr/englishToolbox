<template>
  <div class="bubbles game">
    <v-form
      class="bubbles-textarea" 
      :request="start"
      :preventRedundant="false"
      secondary>
      
      <h2 class="heading-second">Bubbles</h2>
      <p class="text-fourth">Enter the text below you want to memorise</p>

      <v-textarea
        name="text"
        :min="10"
        v-validate/>

      <confirm-button 
        class="button-secondary" 
        message="start"/>
    </v-form>
  </div>
</template>

<script>
import ConfirmButton from '@components/buttons/ConfirmButton'
import VTextarea from '@components/validation/VTextarea'
import VForm from '@components/validation/VForm'


export default {
  components: {
    ConfirmButton,
    VTextarea,
    VForm
  },

  methods: {
    start(data) {
      let text = data.get('text');

      this.$emit('start', text);
    }
  }
}
</script>