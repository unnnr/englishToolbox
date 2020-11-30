<template>
  <transition-group 
    class="pool"
		tag="section"
  	name="list"
    @before-leave="setAbsolute">

    <new-card 
      v-if="canCreate"
      :key="-1"
      @click="createNew"/>

    <card 
      v-for="card in cards"
      :key="card.id"
      
      :description="card.description"
      :created-at="card.createdAt"
      :title="card.id + card.title"
      :views="card.views"
      :img="card.thumbnail"

      :main-tag="card.mainTag"
      :tags="card.tags"
      
      :selected="card.selected"
      :favorite="card.favorite"
      :rectangular="!!!squareCards"

      :context="context(card)"
      @select="select(card)"
      @favorite-toggle="toggleFavorite(card)"/>

  </transition-group>
</template>

<script>
import NewCard from '@components/cards_new/NewCard'
import Card from '@components/cards_new/Card'

export default {
  components: {
    NewCard,
    Card
  },

  props: {
    cards: { type: Array, default: () => [] },

    context: { type: Function, default: () => null },

    canCreate: { type: Boolean, default: false },

    squareCards: { type: Boolean, default: false }
  },

  methods: {
    setAbsolute(target) {
			Object.assign(target.style, {
				position: 'absolute',
				width: target.offsetWidth + 'px',
				top: target.offsetTop + 'px',
				left: target.offsetLeft + 'px'
			})
    },

    select(card) {
      this.$emit('select', card);
    },

    createNew() {
      this.$emit('create-new');
    },

    toggleFavorite(card) {
      this.$emit('favorite-toggle', card);
    },
  }
}
</script>


