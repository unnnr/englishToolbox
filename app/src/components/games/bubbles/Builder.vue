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

export default {
  components: {
    ResultScreen,
    MissingWords,
    Keyword
  },

  data() {
    return {
      lines: [
        { keyword: null,       entry: 'I`am THE', missing: ['I`am', 'THE'] },
        { keyword: 'stoopid',  entry: 'game',     missing: ['game']  },
        { keyword: 'Hello',    entry: '',         missing: null      },
      ]
    }
  },

  methods: {
    compare() {
      for (let line of this.lines) {
        let {keyword, missing} = line;

        let words = this.parse(line.entry)

        console.log(words);
      }
    },

    parse(line) {
      return line.split(/\s/);
    }
  }
}
</script>