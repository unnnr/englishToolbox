<template>
  <div class="modal__content alert alert--error">

    <span class="alert__title heading-fifth">
      Something went wrong
    </span>

    <p class="alert__description text-fourth">
      {{ description }}
    </p>

    <div class="alert__buttons">
      <button 
        ref="ok"
        class="alert__button button-secondary button--reddish"
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
    }
  },
  
  computed: {
    description() {
      if (!!!this.message || this.message.length === 0)
        return 'Please try again'

      return this.message;
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
    }
	}
}
</script>