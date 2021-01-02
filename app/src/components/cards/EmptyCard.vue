<template>
  <div 
    class="card  skeleton-loading"
    :class="{
      'card--rectangle': rectangular}">

    <div 
      class="card__image"
      @click.self="select">

      <div 
        class="card__header"
        @click.self="select">

      </div>
      <div class="card__title" style="z-index: 10"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    rectangular: { type: Boolean, default: false },
  },

  methods: {
    select() {
      this.$emit('select');
    }
  }
}
</script>

<style lang="sass" scoped>

.card 
  animation: card-fade-in 1s ease-in

@keyframes card-fade-in
  from
    opacity: 0
  to 
    opacity: 1

</style>