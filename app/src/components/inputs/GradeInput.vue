<template>
  <div class="review__grade">
    <div class="review__stars">

      <button 
        v-for="(star, key) in stars"
        :key="key"

        class="review__star"
        :class="{
          'review__star--selected': star.selected
        }"

        type="button"
        :disabled="loading"
        @click="select(star)">
      </button>
    </div>

    <span class="review__rating">{{ rate }}</span>

    <v-hidden 
      ref="input"
      :submit="submit"
      v-validate/>
  </div>
</template>

<script>
import VHidden from '@components/validation/VHidden'

export default {
  components: {
    VHidden
  },

  data() {
    return {
      stars: [],
      rate: 4,

      animationDelay: 125,
      starsCount: 5
    }
  },

  computed: {
    loading() {
      let input = this.$refs.input;
      if (!!!input)
        return false;

      return input.loading;
    }
  },


  beforeMount() {
    for (let i = 1; i <= this.starsCount; i++) {
      this.stars.push({
        selected: i <= this.rate ? true : false,
        value: i
      });
    }

    this.$options.queue = {
      list: [],
      pending: false
    }
  },

  methods: {
    submit(data) {
      data.append('grade', this.rate);
    },

    queue(callback) {
      async function fire() {
        this.pending = true;

        let task;
        while(task = this.list.shift())
          await task();

        this.pending = false;
      }

      this.$options.queue.list.push(callback);

      if (!!!this.$options.queue.pending)
        fire.call(this.$options.queue);
    },

    sleep(ms) {
      return new Promise( resolve => setTimeout(resolve, ms));
    },

    async descendSelection(from, to) {
      for (let i = from; i > to; i--)
      { 
        Object.assign(this.stars[i], {
          selected: false
        });

        await this.sleep(this.animationDelay);
      }
    },

    async ascendSelection(from, to) {
      for (let i = from; i <= to ; i++)
      {
        Object.assign(this.stars[i], {
          selected: true
        });

        await this.sleep(this.animationDelay);
      }
    },

    select(star) {
      let selectedIndex = star.value - 1;
      let currentIndex = this.rate - 1;

      // Prevention of redundunt requests
      if (selectedIndex == currentIndex)
        return

      this.rate = star.value;

      // Moving selection from previos to selected star
      if (currentIndex > selectedIndex)
        this.queue(
          this.descendSelection.bind(this, currentIndex, selectedIndex));
      else
        this.queue(
          this.ascendSelection.bind(this, currentIndex, selectedIndex));
    },
  }
}
</script>
