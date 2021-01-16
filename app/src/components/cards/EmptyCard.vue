<template>
  <div 
    class="card"
    :class="{
      'skeleton-loading': loading,
      'card--selected': selected,
      'card--rectangle': rectangular}">

    <div 
      class="card__image"
      :style="{'background-image': src}"
      @click.self="select">

      <div 
        class="card__header"
        @click.self="select">

      </div>
      <div class="card__title" style="z-index: 10">
         <h6 class="heading-sixth"> {{ title }}</h6>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    rectangular: { type: Boolean, default: false },

    loading: { type: Boolean, default: true },

    title: { type: String, default: '' },

    selected: { type: Boolean, default: false },

    image: { type: String, default: '' }
  },

  computed: {
    src() {
      return this.image ? 'url(' + this.image + ')' : ''
    }
  },

  methods: {
    select() {
      this.$emit('select');
    }
  }
}
</script>