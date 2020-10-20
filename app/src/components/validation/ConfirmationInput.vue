<template>
  <v-input
    :submitting="submitting"
    :label="label"
    :icon="icon"
    :min="min"
    :max="max"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  computed: {
    label() {
      return this.target ? this.target.label : null;
    },

    placeholder() {
      return this.target ? this.target.placeholder : null;
    },

    min() {
      return this.target ? this.target.min : null;
    },

    max() {
      return this.target ? this.target.max : null;
    },

    icon() {
      return this.target ? this.target.max : null
    }
  },

  data () {
    return {
      target: null
    }
  },

  methods: {
    submitting() {
      
    }
  }
}
</script>