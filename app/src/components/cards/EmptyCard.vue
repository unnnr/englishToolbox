<template>
  <div 
    class="card"
    :class="{
      'card--rectangle': rectangular}">

    <div 
      class="card__image"
      @click.self="select">

      <div 
        class="card__header"
        @click.self="select">

      </div>
      <div class="card__title"></div>
    </div>

    <div class="card__text"></div>

    <div class="card__footer"></div>
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
