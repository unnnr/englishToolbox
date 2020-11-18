<template>
  <v-input
    ref="input"

    autocomplete="url"
    placeholder="https://youtube.com/..."
    label="Youtube link"
    name="videoUrl"

    :value="defaultValue"
    :validating="validating"

    :focusOnMount="focusOnMount"
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
    defaultValue: { type: String, default: '' },

    focusOnMount: { type: Boolean },
  },

  methods: {
    validating(errors, entry) {
      this.videoId = getYouTubeID(entry);

      let options = { 
        videoId: this.videoId,
        entry: entry
      };

      if (this.videoId) {
        this.$emit('changed' , options);
        return true;
      }

      errors.push('Incorrect youtube link');
      this.$emit('changed' , options);
      return false
    }
  }
}
</script>