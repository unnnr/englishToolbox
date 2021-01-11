<template>
  <div class="bubbles__body">
    <div class="bubbles__area">
      <keyword
        :text="'asdasd'"/>

      <placeholder
        :words="['asd']"/>
   
      <div class="bubbles__bubble-input bubbles__bubble-input--md">
        <input type="text" placeholder="ー">
      </div>
      <div class="bubbles__bubble-input bubbles__bubble-input--lg">
        <input type="text" placeholder="ー">
      </div>
      <div class="bubbles__bubble-input bubbles__bubble-input--error">
        <input type="text">
      </div>
      <div class="bubbles__bubble-input bubbles__bubble-input--success">
        <input type="text">
      </div>        
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
        { keyword: null,       placehodler: ['it`s', 'the'] },
        { keyword: 'stoopid',  placehodler: ['for', 'some', 'reason'] },
        { keyword: 'text',     placehodler: null },
      ]
    }
  }
}
</script>