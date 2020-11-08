<template>
  <video-processor 
    ref="processor"
    :request="submit"
    editing/>
</template>

<script>
import VideoProcessor from '@pages/video/VideoProcessor'
import Videos from '@models/Videos'
import bus from '@services/eventbus'

export default {
  components: {
    VideoProcessor
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    postId() {
      let id = this.target ? this.target.id : null;

      if (typeof id === 'number')
        return id;

      return null;
    }
  },

  methods: {
    hasChanges() {
      let processor = this.$refs.processor;

      return processor.hasChanges();
    },

    async submit(data) {
      // sending data to API
      let id = this.postId;
      if (id === null)
        throw new Error();

      let post = await Videos.edit(id, data);
      bus.dispatch('post-edited', { post }); 
    }
  }
}
</script>