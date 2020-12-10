<template>
  <div class="modal__content alert alert--prompt">

    <div class="alert__header">
      <span class="alert__title heading-fifth">Enter confirmation here</span>
      <button 
        class="alert__button-close"
        @click="cancel">
      </button>
    </div>

    <p class="alert__description text-fifth">
      {{ message }}
    </p>

    <v-input 
      v-model="entry"

      :label="label"
      :max="64"
      
      :visibilityButtoned="password"
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
    label: { type: String, default: 'Your confirmation' },

    message: { type: String, default: '' },

    password: { type: Boolean, default: true },
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