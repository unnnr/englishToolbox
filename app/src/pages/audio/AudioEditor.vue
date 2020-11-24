<template>
  <audio-processor 
    ref="processor"
    :request="submit"
    :deleting="deleting"
    editing/>
</template>

<script>
import AudioProcessor from '@pages/audio/AudioProcessor'
import Audio from '@models/Audio'
import bus from '@services/eventbus'

export default {
  components: {
    AudioProcessor
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

    async deleting(post) {
      let id = post.id;
      await Audio.delete(post.id);
    },
    
    async submit(data) {
      let id = this.postId
      let post = await Audio.edit(id, data);
      
      bus.dispatch('post-edited', { post });
    }
  }
}
</script>