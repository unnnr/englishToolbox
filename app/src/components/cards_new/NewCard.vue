<template>
   <button class="card card--add">
    <div 
      class="card__image"
      @click.self="onClick">

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
      console.log('click');
      this.$emit('click');
    }
  }
}
</script>