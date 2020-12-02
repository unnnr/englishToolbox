<template>
  <recommendation-processor
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
    submit(data) {
      Recommendations
    }
  }
}
</script>