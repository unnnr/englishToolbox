<template>
  <div
    class="i-recommend__card-image"
    :class="{'i-recommend__card-image--loaded': loaded}"
    :style="{'background-image': url }"
    @click="showPopup">

    <v-hidden 
      ref="input"
      
      accept="image/png,image/jpeg,image/webp,image/gif"
      type="file"

      :validate="validate"
      v-validate

      :has-changes="hasChanged"
      :submit="submit"
      :reset="reset"

      @change.native="changeImage"/>
  </div>
</template>

<script>
import VHidden from '@components/validation/VHidden'
import bus from '@services/eventbus'

export default {
  components: {
    VHidden
  },
  
  props: {
    defaultValue: { type: String, default: '' },

    optinal: { type: Boolean, default: false }
  },

  data() {
    return {
      preview: null
    }
  },

  computed: {
    url() {
      let image = this.preview;
      if (!!!image)
        image = this.defaultValue;
      
      return 'url(' + image + ')';
    },

    file: {
      get() {
        let input = this.$refs.input;
        if (!!!input || !!!input.$el)
          return null;

        let file = input.$el.files[0];
        return file;
      },

      cache: false
    },

    loaded() {
      return Boolean(this.preview || this.defaultValue);
    }
  },

  methods: {
    hasChanged() {
      return Boolean(this.file);
    },
    
    reset() {
      let input = this.$refs.input;
      if (!!!input)
        return;
      
      if (this.preview) { 
        URL.revokeObjectURL(this.preview);
        this.preview = '';
      }
    
      input.$el.value = '';
    },

    showPopup() {
      let input = this.$refs.input;
      if (input)
        input.$el.click();
    },

    changeImage() {
      if (this.preview)
        URL.revokeObjectURL(this.preview);

      this.preview =
        URL.createObjectURL(this.file);
    },

    validate() {
      let validated = this.optinal || this.file;
    
      if (!!!validated)
        bus.dispatch('alert-error', { 
          message: 'Please select an image' 
        });

      return validated;
    },

    submit(data) {
      if (this.optinal && !!!this.file)
        return;

      data.append('image', this.file);
    }
  }
}
</script>