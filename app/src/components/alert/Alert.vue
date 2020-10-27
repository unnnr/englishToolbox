<template>
  <!-- <div
    class="alert"
    :class="alertType">

    <span class="alert__header text-second"></span>
    <p class="alert__description text-fifth">{{ message }}</p>

    <input
      class="alert-input input-second"
      v-if="prompt"
      v-model="input"
      :type="promptDotten ? 'password' : false"
      placeholder="">

    <div class="alert__buttons">
     
      <button 
        class="alert__button alert__button--okay"
        v-if="oneButton"
        @click="okay">

        got it
      </button>

      <template v-else>
        <button 
          class="alert__button alert__button--cancel"
          @click="cancel">

          cancel
        </button>
        <button
          class="alert__button alert__button--confirm"
          @click="confirm">

          Confirm
        </button>
      </template>
     
    </div>
  </div>  -->

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
    
    <div 
      class="alert__input input-group-secondary"
      v-if="prompt">

      <div class="input-group__inner">
        <span class="input-group__title">Your input<small class="input-group__counter">0/100</small></span>
        <input class="input-group__input" placeholder="" type="text">
      </div>
    </div>

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
        class="alert__button button--yellowish button-secondary"
        v-if="confirmShown"
        @click="confirm">
      
        
        Confirm
      </button>
    </div>
    
  </div> 
</template>

<script>

const DEFAULT_MESSAGE = `An unexpected error has occurred. Please try again later`;

export default {
  data: function() {
		return {
      input: ''
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
        this.$emit('confirm-prompt', { input: this.input });
      else
        this.$emit('confirm');
		}
	}
}
</script>