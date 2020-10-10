<template>
  <div class="leave-review__grade">
    <div class="leave-review__stars">
      <button 
        class="leave-review__star"
        type="button" 
        v-for="(star, key) in stars"
        :key="key"
        :class="{
          'leave-review__star--full': star.selected
        }"
        @click="select(star)">

        <img 
          class="leave-review__half-star"
          src="img/svg/halfstar.svg" 
          type=""/>

        <img 
          class="leave-review__half-star"
          src="img/svg/halfstar.svg" 
          type=""/>
      </button>
    </div>
    <span class="leave-review__rating">{{ rate }}</span>
  </div>
</template>

<script>

const STARS_COUNT = 5;
const ANIMATION_DELAY = 125;

export default {
  data: function() {
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
  },

  methods: {
    queue(callback) {
      this.$options.lastTask = callback;

      if (!!!this.$options.currentTask)
      {
        this.$options.lastTask = callback;
        this.$options.lastTask();
        return;
      }
      
      let newTask = this.$options.lastTask.then(callback);
      this.$options.lastTask = newTask;
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
        this.descendSelection(currentIndex, selectedIndex);
      else
        this.ascendSelection(currentIndex, selectedIndex);
    },
  }
}
</script>

<style scoped>
.leave-review__star--full > .leave-review__half-star,
.leave-review__half-star {
  opacity: 1;
}

.leave-review__star {
  opacity: 0.25;
  transition: opacity .5s;
}

.leave-review__star--full {
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