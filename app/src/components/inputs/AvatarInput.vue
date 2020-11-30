<template>
  <div
    :style="{'background-image': url }"
    @click="showPopup">

    <v-hidden 
      ref="input"

      type="file"
      accept="image/png,image/jpeg,image/webp,image/gif"
      v-validate

      @change.native="changeAvatar"/>
  </div>
</template>

<script>
// services
import Avatar from '@models/Avatar'
import bus from '@services/eventbus'

// mixins
import HandleRequests from '@mixins/HandleRequests'

// components
import VHidden from '@components/validation/VHidden'

export default {
  components: {
    VHidden
  },

  mixins: [ HandleRequests ],

  props: {
    disabled: { type: Boolean, default: false }
  },

  data() {
    return {
      image: '#'
    }
  },

  computed: {
    url() {
      return 'url(' + this.image + ')';
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    showPopup(event) {
      if (this.disabled)
        return;
        
      let input =  this.$refs.input;
      input.$el.click();
    },

    changeAvatar(event) {
      if (event.target.value.length === 0)
        return;

			let file = this.$refs.input.$el.files[0];
			if (!!!file)
        return;
        
      this.send(
        this.submit.bind(this, file));
    },

    async submit(file) {
      let data = new FormData();
      data.append('avatar', file);

      let newImage = await Avatar.edit(data);
      this.image = newImage;

      bus.dispatch('avatar-changed', newImage);
    },

    async load() {
      this.image = await Avatar.get();
    },
  }
}
</script>