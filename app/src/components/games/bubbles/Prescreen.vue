<template>
  <div 
    class="bubbles game"
    :style="{'margin-top': marginTop}">

    <v-form
      class="bubbles-textarea" 
      :request="start"
      :preventRedundant="false"
      secondary>
      
      <h2 class="heading-second">Bubbles</h2>
      <p class="text-fourth">Enter the text below you want to memorise</p>

      <v-textarea
        ref="textarea"
        name="text"
        :min="10"
        v-validate
        @focus="capture"
        @blur="release"
        @input="capture"/>

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

  data() {
    return {
      top: 0,
      shift: 0,
      shiftToY: 100
    }
  },

  computed: {
    marginTop() {
      return -this.shift + 'px';
    }
  },

  methods: {
    start(data) {
      let text = data.get('text');

      this.$emit('start', text);
    },

    capture() {
      let textarea = 
        this.$refs.textarea.$el;
        
      let top = 
        textarea.getBoundingClientRect().bottom;

      this.shift = this.shift  + top - this.shiftToY;

      console.log(top - this.shiftToY);
    },

    adjust() {

    },

    release() {
      this.shift = 0;
    }
  }
}
</script>