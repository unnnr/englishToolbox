<template>
  <div class="bubbles__body">
    <transition
      name="fade"
      mode="out-in">
      
      <div 
        :key="counter"
        class="bubbles__area">

        <template v-for="(group, index) of lines">
          <keyword
            v-if="group.keyword"
            :key="'key_' + index"
            :text="group.keyword"/>

          <missing-words
            v-if="group.missing"
            v-model="group.entry"

            ref="placeholders"
            :key="'placeholder_' + index"
            :missing="group.missing"
            
            :correct="group.correct"
            :incorrect="group.incorrect"
            
            @resolve="resolve(index)"/>
        </template> 

      </div>
    </transition>

    <result-screen
      v-if="disabled"
      :correct="corrrect"
      @next="next"
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
      disabled: false,
      counter: 0
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

    resolve(index) {
      if (index >= this.lines.length - 1) {
        this.compare();
        return;
      }
        
      let next = 0;
      for (let i = 0; i < index + 1; i++) {
        if (this.lines[i].missing)
          next++;
      }

      let input = this.$refs.placeholders[next];
      input.focus();
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
      this.counter++;
    },

    next() {
      this.$emit('next');
    },
  }
}
</script>