<template>
	 <main class="i-recommend container">
      <h3 class="i-recommend__title heading-third">I recommend</h3>
			
      <recommendation-editor 
        v-if="editing"/>

      <recommendation-creator
        v-else/>

			<recommendation
				v-for="recommendation of recommendations"
				:key="recommendation.id"

        v-context:items="createContext(recommendation)"
				:description="recommendation.description"
				:image="recommendation.image"
				:title="recommendation.title"
				:link="recommendation.link"/>

  </main>
</template>

<script>
import RecommendationCreator from '@components/recommendations/RecommendationCreator'
import RecommendationEditor from '@components/recommendations/RecommendationEditor'
import Recommendation from '@components/recommendations/Recommendation'
import Recommendations from '@models/Recommendations'

export default {
	components: {
    RecommendationCreator,
    RecommendationEditor,
		Recommendation
	},

	data() {
		return {
      recommendations: [],

      canEdit: true,
      editing: false,
    }
  },

  computed: {
    
  },

  mounted() {
    this.load();
  },
  
  methods: {
    createContext(recommendation) {
      if (!!!this.canEdit)
        return;

        return () => ({
        'Edit': () => 
          this.edit(recommendation),

        'Delete': () =>
          this.delete(recommendation),
      });
    },

    delete() {
      
    },

    edit() {
      
    },

    async load() {
      this.recommendations = await Recommendations.all()
    }
  }
}
</script>