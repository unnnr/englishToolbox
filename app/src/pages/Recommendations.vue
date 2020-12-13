<template>
	 <main class="i-recommend container">

      <h3 class="i-recommend__title heading-third">I recommend</h3>
			
      <transition name="fade" mode="out-in">
        <recommendation-editor 
          v-if="editing"
          :target="editingTarget"
          @edited="updateEdited"/>

        <recommendation-creator
          v-if="creating"
          @created="appendNew"/>
      </transition>
   
      <transition-group
        name="cards"
        tag="div"
        class="i-recommend__wrapper"
        @before-leave="setAbsolute">

        <recommendation
          v-for="recommendation of reversed"
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

      canCreate: false,
      editingTarget: null
    }
  },

  computed: {
    reversed() {
      return [...this.recommendations].reverse();
    },

    editing() {
      return this.canCreate && this.editingTarget;
    },

    creating() {
      return this.canCreate && !!!this.editingTarget;
    }
  },

  beforeMount() {
    this.loadUser();
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
      if (!!!this.canCreate)
        return;

      return () => ({
        'Edit': () => 
          this.edit(recommendation),

        'Delete': () =>
          this.delete(recommendation),
      });
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth'});
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

    updateEdited(target) {
      this.appendNew(target);
      this.editingTarget = null;
    },

    appendNew(instance) {
      this.recommendations.push(instance);
    },

    async loadUser() {
      let user = await Auth.user.get();
      this.canCreate = user && user.admin;
    },

    async delete(instance) {
      let id = instance.id;
      await Recommendations.delete(id);

      this.remove(instance);
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