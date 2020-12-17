<template>
  <!-- <svg style="background: red">
  </svg> -->
  <div :key="key">
    <p 
      v-for="(paint, index) of collection"
      :key="index">
      {{ paint.type }}
    </p>
  </div>
</template>

<script>

export default {
  props: {
    drawings: { type: Object, required: true }
  },

  data() {
    return {
      key: 0
    }
  },

  computed: {
    collection() {
      return this.drawings.collection
    }
  }
}
</script>