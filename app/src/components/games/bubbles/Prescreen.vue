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
      <p ref="description" class="text-fourth">Enter the text below you want to memorise</p>

      <v-textarea
        ref="textarea"
        name="text"
        :min="10"
        v-validate
        @focus="capture"
        @blur="release"
        @input="adjust"/>

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
      shift: 0,
      shiftToY: 150
    }
  },

  inject: ['$mobile'],

  computed: {
    marginTop() {
      return -this.shift + 'px';
    },

    mobile() {
      return this.$mobile();
    }
  },

  methods: {
    start(data) {
      let text = data.get('text');

      this.$emit('start', text);
    },

    capture() {
      let description = 
        this.$refs.description;

      this.shiftToY = 
        description.getBoundingClientRect().top

      this.adjust();
    },

    adjust() {
      if (!!!this.mobile)
        return;

      let textarea = 
        this.$refs.textarea.$el;
        
      let top = 
        textarea.getBoundingClientRect().bottom;

      this.shift = this.shift  + top - this.shiftToY;
    },

    release() {
      this.shift = 0;
    }
  }
}
</script>

<style lang="sass" scoped>

.bubbles
  transition: margin .3s 

</style>