<template>
  <transition name="cookies">
    <section class="cookies container">
      <div class="cookies__body">
        <h6 class="cookies__text heading-sixth">We use cookies to make our website better</h6>
        <button class="cookies__button button-secondary">got it</button>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      shown: true
    }
  }
}
</script>

<style lang="sass">

.cookies-leave
  transition: height 0.3s, opacity 0,3

.cookies-leave-active
  height: 0
  opacity: 0
  

</style>