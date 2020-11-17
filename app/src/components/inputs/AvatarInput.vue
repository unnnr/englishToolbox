<template>
  <button
    :style="{'background-image': url }"
    @click="showPopup">

    <v-hidden 
      ref="input"
      type="file"
      v-validate/>

  </button>
</template>

<script>
import HandleRequests from '@mixins/HandleRequests'
import VHidden from '@components/validation/VHidden'
import Avatar from '@models/Avatar'

export default {
  components: {
    VHidden
  },

  mixins: [ HandleRequests ],

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
      let input =  this.$refs.input;
      input.$el.click();
    },


    changeAvatar(event) {
      if (event.target.value.length === 0)
        return;

			let file = this.$refs.avatar.files[0];

			if (!!!file)
				return;

      this.send(
        this.submit.bind(this, file));
    },

    async submit() {
      let data = new FormData();
      data.append('avatar', file);

      let newImage = Auth.user.avatar.edit(data);
      this.image = newImage;
    },

    async load() {
      this.image = await Avatar.get();
    },
  }
}
</script>

<style lang="sass">

input
  display: none

</style>