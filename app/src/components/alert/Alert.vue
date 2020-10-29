<template>
  <div class="modal__content alert"
    :class="{
      'alert--error': error,
      'alert--warning': warning,
      'alert--prompt': prompt,
    }">

    <span class="alert__title heading-fifth">
      {{ title }}
    </span>

    <p class="alert__description text-fourth">
      {{ description }}
    </p>

    <v-input 
      v-if="prompt"
      v-model="entry"
      label="Your confirmation"

      :max="64"
      :forceHidden="promptDotten"

      colorless/>

    <div class="alert__buttons">
      <button 
        class="alert__button button--skeleton button-secondary"
        v-if="cancelShown"
        @click="cancel">
        
        Cancel
      </button>

      <button 
        v-if="okShown"
        class="alert__button button-secondary"
        :class="{
          'button--yellowish': warning,
          'button--reddish': error,
        }"
        @click="okay">
        
        Ok
      </button>

      <button 
        class="alert__button button--bluish button-secondary"
        v-if="confirmShown"
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

  data() {
		return {
      entry: ''
		}   
  },
  
  props: {
    warning: {
      type: Boolean,
      default: false
    },

    prompt: {
      type: Boolean,
      defualt: false
    },
    
    promptDotten: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: ''
    }
  },

  computed: {
    title() {
      if (this.warning)
        return 'Are you sure?'

      if (this.prompt)
        return 'Enter confirmation here'

      return 'Something went wrong';
    },

    description() {
      if (this.message.length > 0)
        return this.message;

      if (this.error)
        return 'Please try again';

      return '';
    },

    error() {
     return !!!this.warning && !!!this.prompt;
    },
    
    cancelShown() {
      return this.warning || this.prompt;
    },

    okShown() {
      return this.warning || this.error;
    },

    confirmShown() {
      return this.prompt;
    }
  },
  
  methods: {
		okay() {
			this.$emit('okay', event);
    },
    
    cancel() {
			this.$emit('cancel', event);
    },

		confirm() {
      if (this.prompt)
        this.$emit('confirm-prompt', { entry: this.entry });
      else
        this.$emit('confirm');
		}
	}
}
</script>