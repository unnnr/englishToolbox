<template>
  <v-input
    ref="input"

    placeholder="https://youtube.com/..."
    label="Youtube link"
    name="videoUrl"

    :value="defaultValue"
    :validating="validating"

    v-validate/>

</template>

<script>

import VInput from '@components/validation/VInput'
import getYouTubeID from 'get-youtube-id'

export default {
  components: {
    VInput
  },

  props: {
    defaultValue: { type: String, default: '' }
  },

  methods: {
    validating(errors, entry) {
      if (getYouTubeID(entry))
        return true;

      errors.push('Incorrect youtube link');
      return false
    }
  }
}
</script>