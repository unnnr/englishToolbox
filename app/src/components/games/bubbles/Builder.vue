<template>
  <div 
    class="bubbles__body"
    :style="{'margin-top': marginTop}"
    @transitionend="moved">

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
            ref="placeholders"

            :key="'placeholder_' + index"
            :missing="group.missing"
            :value="group.entry"
            
            :correct="group.correct"
            :incorrect="group.incorrect"
            
            @resolve="resolve(index)"
            @focus="onFocus"
            @blur="onBlur"
            @input="options => onInput(index, options)"/>
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
      counter: 0,

      shift: 0,
      shiftToY: 100,
      shiftFrom: 0,
    }
  },

  inject: ['$mobile'],

  computed: {
    corrrect() {
      if (!!!this.disabled)
        return false;

      for (let line of this.lines) {
        if (line.incorrect)
          return false;
      }

      return true;
    },

    marginTop() {
      return -this.shift + 'px';
    },

    mobile() {
      return this.$mobile();
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
    onFocus(event) {
      if (!!!this.moving)
        this.shiftFrom = event.target.offsetTop;

      this.adjust();
    },

    adjust() {
      if (!!!this.mobile)
        return;

      let top = this.shiftToY;
      this.shift = this.shiftFrom - this.shiftToY;
    },

    onBlur(event) {
      this.shift = 0;
      this.moving = true;
    },

    moved() {
      this.moving = false;
    },

    onInput(index, {entry, event}) {
      this.lines[index].entry = entry;
      this.adjust(event);
    },


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
      let next = 0;
      for (let i = 0; i < index + 1; i++) {
        if (this.lines[i].missing)
          next++;
      }

      let input = this.$refs.placeholders[next];
      if (!!!input) {
        this.compare();
        return;
      }

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

<style lang="sass" scoped>

.bubbles__body
  transition: margin .3s 

</style>