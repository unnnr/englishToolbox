<template>
  <div class="game verbs" key="list">
    <div class="game__elements">
      <button 
        v-if="mobile"
        class="game__element game__element--exit"
        @click="close">
      </button>

      <div class="verbs__search">
        <input 
          v-model="entry"
          ref="search"
          placeholder="search" 
          type="text" 
          @keydown="some"
          @input="search">

      </div>
    </div>

    <div class="verbs__scrollable">
      <table class="verbs__table">
        <tbody>
          <tr>
            <th>#</th>
            <th>infinitive (I)</th>
            <th>past simple (II)</th>
            <th> past participle (III) </th>
          </tr>
          
          <tr 
            v-for="([first, second, third], index) of verbs"
            :key="index"

            ref="rows"
            :class="isSelected(index) ? 'verbs__tr-active' : ''">

            <td>{{index + 1}}</td>
            <td>{{ first }}</td>
            <td>{{ second }}</td>
            <td>{{ third }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Verbs from '@services/IrregularVerbs'

export default {
  data() {
    return {
      verbs: Verbs.list(),
      entry: '',
      selected: -1
    }
  },

  inject: ['$mobile'], 

  computed: {
    mobile() {
      return this.$mobile();
    }
  },
  
  methods: {
    some(event) {
      let { key } = event;

      if (key === 'Enter')
        this.$refs.search.blur();
    },

    search() {
      this.selected =
        Verbs.search(this.entry);

      if (this.selected === -1)
        return;

      let el = this.$refs.rows[this.selected];
      el.scrollIntoView({ block: 'center' });
    },

    isSelected(index) {
      return index === this.selected;
    },

    close() {
      document.exitFullscreen();
    }
  }
}
</script>

<style lang="sass">

.verbs__table
  scroll-behavior: 'smooth'

</style>