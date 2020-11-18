<template>
  <audio-processor
    ref="processor"
    :request="submit"/>
</template>

<script>
import AudioProcessor from '@pages/audio/AudioProcessor'
import Audio from '@models/Audio'
import bus from '@services/eventbus'

export default {
  components: {
    AudioProcessor
  },

  methods: {
    hasChanges() {
      let processor = this.$refs.processor;
      return processor.hasChanges();
    },
    
    async submit(data) {
      let post = await Audio.create(data);

      bus.dispatch('post-created', { post });
    }
  }
}
</script>