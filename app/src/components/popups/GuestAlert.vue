<template>
  <div class="modal__content alert alert--notification">

    <div class="alert__header">
      <span class="alert__title heading-fifth">You must be authorized</span>
      <button 
        class="alert__button-close"
        @click="cancel">
      </button>
    </div>

    <p class="alert__description text-fifth">
      This feature is only available to authorized users. 
      Join our cozy community and get access to many other features and games.
      We are waiting for you!
    </p>

    <div class="alert__buttons">
      <button 
        class="alert__button button-secondary button--skeleton"
        @click="toLogin">
        
        login in
      </button>

      <button 
        class="alert__button button-secondary"
        @click="toRegister">

        sign up
      </button>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
		cancel() {
      this.$emit('cancel');
    },

    toLogin() {
      this.$router.push({
        path: '/login'
      })

      this.$emit('okay');
    },

    toRegister() {
      this.$router.push({
        path: '/register'
      })

      this.$emit('okay');
    }
	}
}
</script>