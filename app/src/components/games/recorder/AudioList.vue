<template>
  <div class="recorder">
    <div class="recorder-list">
      <div class="recorder__controls">
        <div class="recorder__button-group">
          <button class="recorder__element recorder__exit-button"></button>
          <button 
            class="recorder__element recorder__random-button"
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
  </div>
</template>


<script>
export default {
  props: {
    list: { type: Array, default: () => [] }
  },

  methods: {
    random() {
      let index = 
        Math.floor(Math.random() * (this.list.length - 1))

      this.$emit('select', index);
    },

    select(index) {
      this.$emit('select', index);
    }
  }
}
</script>