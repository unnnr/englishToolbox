<template>
  <scale-group-transition class="pool">

    <new-card 
      v-if="canCreate"
      :key="-1"
      @click="createNew"/>

    <card 
      v-for="card in cards"
      :key="card.id"
      
      :description="card.description"
      :created-at="card.createdAt"
      :title="card.title"
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

  </scale-group-transition>
</template>

<script>
import ScaleGroupTransition from '@components/transitions/ScaleGroupTransition'
import NewCard from '@components/cards/NewCard'
import Card from '@components/cards/Card'

export default {
  components: {
    ScaleGroupTransition,
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


