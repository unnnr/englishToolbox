<template>
	 <main
    class="i-recommend container"
    card="main"
    name="cards">

      <h3 class="i-recommend__title heading-third">I recommend</h3>
			
      <recommendation-editor 
        v-if="editingTarget"
        :target="editingTarget"
        @edited="updateEdited"/>

      <recommendation-creator
        v-else
        @created="appendNew"/>

      <transition-group
        class="recommendations"
        name="cards"
        @before-leave="setAbsolute">

        <recommendation
          v-for="recommendation of recommendations"
          :key="recommendation.id"

          v-context:items="createContext(recommendation)"
          :description="recommendation.description"
          :image="recommendation.image"
          :title="recommendation.title"
          :link="recommendation.link"/>

      </transition-group>

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
      editingTarget: null
    }
  },

  computed: {
    
  },

  mounted() {
    this.load();
  },
  
  methods: {
    setAbsolute(card) {
			Object.assign(card.style, {
				position: 'absolute',
				width: card.offsetWidth + 'px',
				top: card.offsetTop + 'px',
				left: card.offsetLeft + 'px'
			})
    },

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

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
    },

    updateEdited() {

    },

    remove(instace) {
      let index = this.recommendations.indexOf(instace);
      if (index === -1)
        return;

      this.recommendations.splice(index, 1);
    },

    edit(recommendation) {
      this.scrollToTop();


      if (this.editingTarget)
        this.appendNew(this.editingTarget);

      this.editingTarget = recommendation;
      this.remove(this.editingTarget);
    },

    appendNew(instance) {
      this.recommendations.push(instance);
    },

    async load() {
      let recommendations = await Recommendations.all();

      for (let item of recommendations)
        this.$set(item, 'shown', true);

      this.recommendations = recommendations;
    }
  }
}
</script>

<style lang="sass">

.recommendations
  position: relative

.cards-move 
  transition: transform .4s ease-in-out

.cards-enter-active, .cards-leave-active 
  transition: opacity .5s !important

.cards-enter, .cards-leave-to
  opacity: 0 !important

</style>