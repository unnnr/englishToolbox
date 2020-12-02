<template>
  <recommendation-processor
    :request="submit"
    :target="target"/>
</template>

<script>
import RecommendationProcessor from '@components/recommendations/RecommendationProcessor'
import Recommendations from '@models/Recommendations'

export default {
  components: { 
    RecommendationProcessor
  },

  props: {
    target: { type: Object, default: null },
  },

  methods: {
    async submit(data, hasChanges) {
      let target = this.target;

      if (hasChanges) 
        taregt = await Recommendations.edit();

      this.$emit('edited', target);
    }
  }
}
</script>