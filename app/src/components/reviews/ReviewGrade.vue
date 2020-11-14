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
        @click="select(star)">
      </button>
    </div>

    <span class="review__rating">{{ rate }}</span>
  </div>
</template>

<script>

const STARS_COUNT = 5;
const ANIMATION_DELAY = 125;

export default {
  data() {
    return {
      stars: [],
      rate: 4
    }
  },

  beforeMount() {
    for (let i = 1; i <= STARS_COUNT; i++)
    {
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
    queue(callback) {
      async function fire() {
        this.pending = true;

        let task;
        while(task = this.list.shift())
          await task() && console.log(task);

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

        await this.sleep(ANIMATION_DELAY);
      }
    },

    async ascendSelection(from, to) {
      for (let i = from; i <= to ; i++)
      {
        Object.assign(this.stars[i], {
          selected: true
        });

        await this.sleep(ANIMATION_DELAY);
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

<style scoped>
.review__star--selected {
  opacity: 1;
}

.review__star--selected {
  opacity: 0.25;
  transition: opacity .5s;
}

.review__star--selected {
  opacity: 1;
  animation: scale .5s;
}

@keyframes scale {
  80% {
    transform: scale(1.3)
  }
  100% {
    transform: scale(1)
  }
}
</style>