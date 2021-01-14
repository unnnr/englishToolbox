<template>
  <div class="matcher-list">
      <div class="matcher-list__body">
        <div class="game__controls">
          <div class="game__elements">
            <button class="game__element game__element--exit"></button>
            <button class="game__element game__element--random">random</button>
          </div>
        </div>

        <h5 class="heading-fifth">Matcher</h5>
        <p class="text-fourth">Tempor sit morbi et eleifend aliquam habitant in vitae gravida.</p>
        
        <div 
          class="matcher-list__card" 
          v-for="(group, index) of groups"
          :key="index">

          <div class="matcher-list__text">
            <h5 class="heading-fifth matcher-list__title">Group 1</h5>
            <p class="text-third matcher-list__words">
              {{ computeWords(group) }} 
            </p>
          </div>

          <button class="matcher-list__button">
          </button>
        </div>

      </div>
    </div>
</template>

<script>
import IrregularVerbs from '@services/IrregularVerbs'

export default {
  computed: {
    groups() {
      return IrregularVerbs.groups()
    }
  },

  methods: {
    start() {
      let words = IrregularVerbs.slice(Config.deckLength);

      this.$emit('start', words);
    },

    computeWords(group) {
      let message = '';

      for (let pair of group)
        message += pair[0] + ', '
      
      return message;
    }
  }
}
</script>