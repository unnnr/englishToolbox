<template>
  <recommendation-processor
    ref="processor"
    :request="submit"/>
</template>

<script>
import RecommendationProcessor from '@components/recommendations/RecommendationProcessor'
import Recommendations from '@models/Recommendations'

export default {
  components: { 
    RecommendationProcessor
  },

  methods: {
    async submit(data) {
      let created = 
        await Recommendations.create(data);

      this.$emit('created', created)


      let processor = this.$refs.processor;
      if (processor)
        processor.reset();
    }
  }
}
</script>