<template>
   <button class="card card--add">
    <div 
      class="card__image"
      @click="onClick">

      <div class="card__title">
        <h6 class="heading-sixth">Upload new post</h6>
      </div>
    </div>
    <div class="card__text">
      <p class="text-third"></p>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="sass" >

.card--add .card__image
  cursor: pointer

</style>