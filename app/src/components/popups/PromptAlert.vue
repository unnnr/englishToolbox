<template>
  <div class="modal__content alert alert--prompt">
    <div class="alert__header">
      <span class="alert__title heading-fifth">Enter confirmation here</span>
      <button 
        class="alert__button-close"
        @click="cancel">
      </button>
    </div>

    <p 
      v-if="password"
      class="alert__description text-fifth">
      
      <span>
        {{ message }}.
        
        <span v-if="true">
          If you forgot it, please <u @click="resetPassword">click here</u>
        </span>

      </span>
    </p>

    <p 
      v-else 
      class="alert__description text-fifth">
      
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
import Auth from '@services/Auth'
import bus from '@services/eventbus'

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
    type: { type: String, default: 'password' },
  },

  data() {
    return {
      canReset: false
    }
  },

  computed: {
    entry() {
      let input = this.$refs.input;
      if (!!!input)
        return '';

      return input.entry;
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

  mounted() {
    this.load()
  },
   
  methods: {
    validate() {
      let input = this.$refs.input;
      if (!!!input)
        return false;

      return input.validated;
    },

    cancel() {
			this.$emit('cancel', event);
    },

		confirm() {
      if (!!!this.validate())
        return;

      this.$emit('confirm', { 
        entry: this.entry
      });
    },

    async load() {
      this.canReset = await Auth.check();
    },
    
    async resetPassword() {
      function onError(error) {
				bus.dispatch('alert-error', {	
          message: 'Some problem occurred during the recovery creation. Please try again'
        });
			}

      let user = await Auth.user.get();
      
      Auth.createRecovery()
				.catch(onError);
       
      bus.dispatch('alert-recovery', {
        email: user.email
      })
    }
	}
}
</script>