<template>
  <transition name="cookies">
    <section
      v-if="shown" 
      class="cookies container">

      <div class="cookies__body">
        <h6 class="cookies__text heading-sixth">We use cookies to make our website better</h6>
        <button 
          class="cookies__button button-secondary"
          @click="gotIt">
          
          got it
        </button>
      </div>
    </section>
  </transition>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      shown: true,
      name: 'cookies-accepted'
    }
  },

  beforeMount() {
    this.shown = !!!Cookies.get(this.name);
  },

  methods: {
    gotIt() {
      this.shown = false;
      Cookies.set(this.name, true);
    }
  }
}
</script>

<style lang="sass">

.cookies-leave-active
  opacity: 0
  transform: translateY(15px)
  transition: opacity .3s, transform .3s

</style>