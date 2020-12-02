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
      let id = target.id;

      if (hasChanges) 
        target = await Recommendations.edit(id, data);


      this.$emit('edited', target);
    }
  }
}
</script>