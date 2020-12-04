<template>
  <chart-processor
    ref="processor"
    :request="submit"/>
</template>

<script>
import ChartProcessor from '@pages/chart/ChartProcessor'
import Charts from '@models/Charts'
import bus from '@services/eventbus'

export default {
  components: {
    ChartProcessor
  },

  methods: {
    hasChanges() {
      let processor = this.$refs.processor;
      return processor.hasChanges();
    },
    
    async submit(data) {
      let post = await Charts.create(data);

      bus.dispatch('post-created', { post });
    }
  }
}
</script>