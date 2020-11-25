<template>
  <div class="modal__content alert alert--prompt">

    <span class="alert__title heading-fifth">
      Enter confirmation here
    </span>

    <p class="alert__description text-fourth">
      {{ message }}
    </p>

    <v-input 
      v-model="entry"

      label="Your confirmation"
      :max="64"
      
      visibilityButtoned
      focus-on-mount
      colorless/>

    <div class="alert__buttons">
      <button 
        class="alert__button button--skeleton button-secondary"
        @click="cancel">
        
        Cancel
      </button>

      <button 
        class="alert__button button--bluish button-secondary"
        @click="confirm">
        
        Confirm
      </button>
    </div>
    
  </div> 
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  provide() {
    return {
      secondary: true
    }
  },
    
  props: {
    message: {
      type: String,
      default: ''
    }
  },

  data() {
		return {
      entry: ''
		}   
  },

  mounted() {
    this.autoFocus();
  },
   
  methods: {
    autoFocus() {
      if (this.warning || this.error) {
        let button = this.$refs.ok;

        if (button)
          button.focus();
      }
    },
    
    cancel() {
			this.$emit('cancel', event);
    },

		confirm() {
      this.$emit('confirm', { entry: this.entry });
		}
	}
}
</script>