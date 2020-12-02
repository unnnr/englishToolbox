<template>
	 <main class="i-recommend container">
      <h3 class="i-recommend__title heading-third">I recommend</h3>
			
      <recommendation-editor/>

      <recommendation-creator/>

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

export default {
	components: {
    RecommendationCreator,
    RecommendationEditor,
		Recommendation
	},

	data() {
		return {
			recommendations: [{id: 12, image:'http://etoolbox/storage/avatars/default_OK89ORldpriXJ1P4JMAN5THZ4ANZpVjvItnUAPDJ.svg', title: 'adasdjalsd', description: 'adasdjalsd', link: 'adasdjalsd'}],
      canEdit: true,
    }
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
  }
}
</script>