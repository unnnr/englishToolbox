<template>
   <button class="card card--add">
    <div 
      class="card__image"
      @click.self="onClick">

      <div class="card__title">
        <h6 class="heading-sixth">Upload new post</h6>
      </div>
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