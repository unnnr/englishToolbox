<template>
  <v-input
    v-model="entry"
    class="input-group--code"

    placeholder="0000"
    label="Your confirmation code"
    name="code"
    
    :max="4"
    :min="4"

    v-bind="$attrs"
    v-validate
    @input="filterKeys"/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  data() {
    return {
      entry: ''
    }
  },

  methods: {
    async filterKeys(value) {
      await this.$nextTick();
      this.entry = value.replace(/[^\d]+/g, '');
    }
  }
}
</script>