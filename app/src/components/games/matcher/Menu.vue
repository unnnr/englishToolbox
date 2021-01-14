<template>
  <div class="matcher-list">
      <div class="matcher-list__body">
        <div class="game__controls">
          <div class="game__elements">
            <button class="game__element game__element--exit"></button>

            <button class="game__element game__element--random" @click="random">
              random
            </button>
          </div>
        </div>

        <h5 class="heading-fifth">Matcher</h5>
        <p class="text-fourth">Tempor sit morbi et eleifend aliquam habitant in vitae gravida.</p>
        
        <div 
          class="matcher-list__card" 
          v-for="(group, index) of groups"
          :key="index">

          <div class="matcher-list__text">
            <h5 class="heading-fifth matcher-list__title">Group {{ index }}</h5>
            <p class="text-third matcher-list__words">
              {{ computeWords(group) }} 
            </p>
          </div>

          <button 
            class="matcher-list__button"
            @click="start(group)">
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
    start(group) {
      let shuffled = [ ...group].sort(() => .5 - Math.random());
      let words = [];

      for (let i = 0; i < shuffled.length; i++) {
        let key = i;

        for (let verb of group[i]) {
          words.push({
            verb, key
          });
        }
      }

      this.$emit('start', words)
    },

    random() {
      let random = Math.floor(Math.random() * (this.groups.length - 1));
      let group = this.groups[random]; 
      this.start(group);
    },

    computeWords(group) {
      let message = '';

      for (let i = 0; i < group.length; i ++){
        message += group[i][0]

        if (i !== group.length - 1)
         message += ', '
      }
      
      return message;
    }
  }
}
</script>