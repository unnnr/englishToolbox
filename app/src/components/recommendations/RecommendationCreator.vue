<template>
  <recommendation-processor
    :request="submit"/>
</template>

<script>
import RecommendationProcessor from '@components/recommendations/RecommendationProcessor'

export default {
  components: { 
    RecommendationProcessor
  },

  methods: {
    submit(data) {
      console.log(123);
    }
  }
}
</script>