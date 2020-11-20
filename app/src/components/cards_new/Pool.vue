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
      :title="card.title"
      :views="card.views"
      :img="card.thumbnail"

      :main-tag="card.mainTag"
      :tags="card.tags"
      
      :selected="card.selected"
      :favorite="card.favorite"
      :rectangular="!!!squareCards"

      v-context:items="context(card)"
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


<style>

.pool {
	position: relative;
	overflow: hidden;
}

.card--add.list-move  {
  transition: none;
}

.list-move {
  transition: transform 1s ease-in-out,
  						opacity 1s ease-in-out;
}

.list-enter-active
{
   -webkit-animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.list-leave-active {
	-webkit-animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

@-webkit-keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

@keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

</style>