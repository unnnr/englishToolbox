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
          :missing="group.missing"
          
          :correct="group.correct"
          :incorrect="group.incorrect"/>
        
      </template> 
    </div>

    <result-screen
      v-if="disabled"
      :correct="corrrect"
      @reset="reset"/>
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
    text: { type: String, default: '' }
  },

  data() {
    return {
      lines: [],
      disabled: false
    }
  },

  computed: {
    corrrect() {
      if (!!!this.disabled)
        return false;

      for (let line of this.lines) {
        if (line.incorrect)
          return false;
      }

      return true;
    }
  },

  watch: {
    text: {
      handler(text) {
        this.reset();
      },

      immediate: true
    }
  },

  methods: {
    compare() {
      this.disabled = true;

      for (let line of this.lines) {
        let {entry, missing} = line;

        if (!!!missing)
          continue;

        if (Bubbles.compare(entry, missing))
          this.$set(line, 'correct', true);
        else
          this.$set(line, 'incorrect', true);
      }
    },

    showSample(line) {
      let sample = line.missing.join(' ');
      let message = line.entry + ' 🠒 ' + sample;

      this.$set(line, 'entry', message);
    },

    reset(text) {
      let lines = Bubbles.parse(this.text);

      for (let line of lines) {
        Object.assign(line, {
          incorrect: false,
          correct: false,
          entry: ''
        })
      }

      this.lines = lines;
      this.disabled = false;
    },

    next() {

    },
  }
}
</script>