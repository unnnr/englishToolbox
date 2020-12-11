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

    <password-input
      v-if="password"
      ref="input"
      focus-on-mount
      colorless/>

    <email-input
      v-if="email"
      ref="input"
      focus-on-mount
      colorless/>

    <v-input 
      v-if="text"
      ref="input"

      :label="label"
      :max="64"
      
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
import PasswordInput from '@components/inputs/PasswordInput'
import EmailInput from '@components/inputs/EmailInput'
import VInput from '@components/validation/VInput'

export default {
  components: {
    PasswordInput,
    EmailInput,
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

  computed: {
    entry() {
      let input = this.$refs.input;
      if (!!!input)
        return '';

      return input.entry;
    },

    validated() {
      let input = this.$refs.input;
      if (!!!input)
        return false;

      return input.validated;
    },

    password() {
      return this.type === 'password';
    },

    email() {
      return this.type === 'email';
    },

    text() {
      return !!!this.email && !!!this.password;
    },

    message() {
      if (this.password)
        return 'Confirm action with password';
      
      if (this.email)
        return 'What email did you register your account to?';

      return '';
    }
  },
   
  methods: {
    validate() {
      let input = this.$refs.input;
      if (!!!input)
        return false;

      return input.validate();
    },

    cancel() {
			this.$emit('cancel', event);
    },

		confirm() {
      if (!!!this.validated)
        return;

      this.$emit('confirm', { 
        entry: this.entry
      });
		}
	}
}
</script>