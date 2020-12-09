<template>
  <div class="modal__content alert alert--warning">

    <div class="alert__header">
      <span class="alert__title heading-fifth">Are you sure?</span>
      <button class="alert__button-close"></button>
    </div>

    <p class="alert__description text-fifth">
      {{ message }}
    </p>

    <div class="alert__buttons">
      <button 
        class="alert__button button--skeleton button-secondary"
        @click="cancel">
        
        Cancel
      </button>

      <button 
        ref="ok"
        class="alert__button button-secondary button--yellowish"
        @click="okay"
        autofocus>
        
        Ok
      </button>
    </div>
  </div> 
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
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

		okay() {
			this.$emit('okay', event);
    },
    
    cancel() {
			this.$emit('cancel', event);
    },
	}
}
</script>