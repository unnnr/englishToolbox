<template>
  <recommendation-processor
    :request="submit"
    :target="target"/>
</template>

<script>
import RecommendationProcessor from '@components/recommendations/RecommendationProcessor'

export default {
  components: { 
    RecommendationProcessor
  },

  props: {
    target: { type: Object, default: null },
  },

  methods: {
    submit(data) {
      
    }
  }
}
</script>