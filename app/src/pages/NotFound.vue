<template>
  <main class="not-found container">
    <img src="/img/svg/404.svg" alt="">
    <button 
      class="button-secondary"
      @click="back">
      
      Go back!
    </button>
  </main>
</template>

<script>
export default {

  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>
