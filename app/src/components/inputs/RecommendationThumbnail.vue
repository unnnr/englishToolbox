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

      @change.native="changeImage"/>
  </div>
</template>

<script>
import VHidden from '@components/validation/VHidden'

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
      return Boolean(this.preview);
    }
  },

  methods: {
    showPopup() {
      let input = this.$refs.input;
      if (input)
        input.$el.click();
    },

    changeImage() {
      if (this.preview)
        URL.revokeObjectURL(this.preview);

      console.log(this.preview, this.file.size);
      this.preview =
        URL.createObjectURL(this.file);
      console.log(this.preview);
      
    },

    validate() {
      return this.optinal || this.preview;
    },

    submit(data) {
      if (this.optinal && !!!this.preview)
        return;

      data.append('image', this.file);
    }
  }
}
</script>