<template>
  <div class="bubbles__body">
    <div class="bubbles__area">
      <template
        v-for="(group, index) of parsed">

        <keyword
          v-if="group.keyword"
          :key="'key_' + index"
          :text="group.keyword"/>

        <placeholder
          v-if="group.placeholder"
          ref="placeholders"

          :key="'placeholder_' + index"
          :words="group.placeholder"/>
        
      </template> 
    </div>

    <div class="bubbles__alert game__alert game__alert--active game__alert--success">
      <div class="game__alert-group">
        <div class="game__alert-text">
          <h6 class="game__alert-error">You was too close!</h6>
          <h5 class="game__alert-title">Arcu nibh volutpat imperdiet nulla nibh</h5>
        </div>
      </div>
      <button class="game__alert-button">next</button>
    </div>
  </div>
</template>

<script>
import Placeholder from '@components/games/bubbles/Placeholder'
import Keyword from '@components/games/bubbles/Keyword'

export default {
  components: {
    Placeholder,
    Keyword
  },

  data() {
    return {
      parsed: [
        { keyword: null,       placeholder: ['I`am', 'THE'] },
        { keyword: 'stoopid',  placeholder: ['game'] },
        { keyword: 'Hello',     placeholder: null },
      ]
    }
  }
}
</script>