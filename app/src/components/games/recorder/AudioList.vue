<template>
    <div class="recorder-list">
      <div class="game__controls">
        <div class="game__elements">
          <button 
            v-if="mobile"
            class="game__element game__element--exit"
            @click="close">
          </button>

          <button 
            class="game__element game__element--random"
            @click="random">

            random
          </button>
        </div>
      </div>
      <h5 class="heading-fifth">Audio recorder</h5>
      <p class="text-fourth">Tempor sit morbi et eleifend aliquam habitant in vitae gravida.</p>

      <div 
        class="recorder-list__card"
        v-for="(sample, index) of list"
        :key="index">

        <q class="heading-fifth recorder-list__text"><i>{{ sample.text }}</i></q>

        <button 
          class="recorder-list__button"
          @click="select(index)">
        </button>
      </div>
    </div>
</template>


<script>
export default {
  props: {
    list: { type: Array, default: () => [] }
  },
  
  inject: ['$mobile'], 

  computed: {
    mobile() {
      return this.$mobile();
    }
  },

  methods: {
    random() {
      let index = 
        Math.floor(Math.random() * (this.list.length - 1))

      this.$emit('select', index);
    },

    select(index) {
      this.$emit('select', index);
    },

    close() {
      document.exitFullscreen();
    }
  }
}
</script>