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

      :icon="icon"
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
    type: { type: String, default: 'Your confirmation' },
  },

  data() {
		return {
      entry: ''
		}   
  },

  computed: {
    password() {
      return this.type === 'password';
    },

    email() {
      return this.type === 'email';
    },

    text() {
      return !!!this.email && !!!this.password;
    },

    icon() {
      if (this.password)
        return 'password';
      
      if (this.email)
        return 'email';

      return null;
    },

    message() {
      if (this.password)
        return 'Confirm action with password';
      
      if (this.email)
        return 'Please write your email';

      return '';
    },

    label() {
      if (this.password)
        return 'Password';
      
      if (this.email)
        return 'Email';

      return '';
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