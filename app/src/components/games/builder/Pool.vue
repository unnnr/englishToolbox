<template>
  <div class="builder__pool">

    <div 
      v-for="(brick, index) in bricks"
      :key="index"

      ref="words"
      class="builder__brick"
      
      :style="{
        'opacity': computeOpacity(brick),
        'height': computeHeight(brick),
        'width': computeWidth(brick)}"

      @mousedown="(event) => drag(index, event)">

      {{ brick.word }}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    words: { type: Array, default: () => [] },
  },

  data() {
    return  {
      bricks: []
    }
  },

  inject: ['$dragger'],

  computed: {
    dragger() {
      return this.$dragger();
    }
  },

  mounted() {
    this.dragger.remove = this.put.bind(this);
    this.parseWords();
  },

  methods: {
    parseWords() {
      let bricks = [];
      for (let word of this.words) {
        let brick = {
          word, disabled: false
        };

        bricks.push(brick);
      }

      this.bricks = bricks;
    },

    remove(index) {
      this.bricks.splice(index, 1);
    },

    drag(index, event) {
      let target = {
        word: this.bricks[index].word,
        el: this.$refs.words[index]
      };

      this.remove(index);
      this.dragger.drag(target, event);
    },

    async put(target) {
      let brick = {
        disabled: true,
      }

      brick.word = target.word;
      brick.width = target.el.offsetWidth;
      brick.height = target.el.offsetHeight;
      let index = this.bricks.push(brick) - 1;

      // Waiting for dom update
      await this.$nextTick();

      let el = this.$refs.words[index];
      let dummy = target.el;

      dummy.style.transition = 'left 1s, top 1s';
      dummy.style.left = el.offsetLeft + 'px';
      dummy.style.top = el.offsetTop + 'px';

      // Waiting for animation
      await new Promise(resolve => setTimeout(resolve, 1000))

      dummy.remove();
      brick.disabled = false;
    },

    computeWidth(brick) {
      return brick.disabled ? 
        brick.width + 'px' : 'auto';
    },

    computeHeight(brick) {
      return brick.disabled ? 
        brick.height + 'px' : 'auto';
    },

    computeOpacity(brick) {
      return brick.disabled ? 
        '0' : '1';
    }
  }
}
</script>