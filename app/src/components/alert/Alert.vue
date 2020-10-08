<template>
  <div
    class="alert alert--prompt"
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
        v-if="errorType"
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
		alertType() {
			if (this.warning)
				return 'alert--warning';

			if (this.prompt)
				return 'alert--prompt';

			return 'alert--error';
    },
    
    errorType() {
      return !!!this.warning && !!!this.prompt;
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