<template>
  <div class="bubbles__body">
    <div class="bubbles__area">
      <template v-for="(group, index) of lines">

        <keyword
          v-if="group.keyword"
          :key="'key_' + index"
          :text="group.keyword"/>

        <missing-words
          v-if="group.missing"
          v-model="group.entry"
          :key="'placeholder_' + index"
          :missing="group.missing"/>
        
      </template> 
    </div>

    <result-screen/>
  </div>
</template>

<script>
import MissingWords from '@components/games/bubbles/MissingWords'
import ResultScreen from '@components/games/bubbles/ResultScreen'
import Keyword from '@components/games/bubbles/Keyword'
import Bubbles from '@services/Bubbles'

export default {
  components: {
    ResultScreen,
    MissingWords,
    Keyword
  },

  props: {
    text: { type: String, default:'I\'m the stoopid -  game -' }
  },

  data() {
    return {
      
    }
  },

  computed: {
    lines() {
      let lines = Bubbles.parse(this.text);

      for (let line of lines) {
        Object.assign(line, {
          incorrect: false,
          correct: false,
          entry: ''
        })
      }

      return lines;
    }
  },

  methods: {
    compare() {
      for (let line of this.lines) {
        let {entry, missing} = line;

        if (!!!missing)
          continue;



        console.log(Bubbles.compare(entry, missing));
      }
    }
  }
}
</script>