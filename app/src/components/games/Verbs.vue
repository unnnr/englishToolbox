<template>
  <div class="verbs">
    <div class="verbs__button-group">
      <button class="verbs__element verbs__exit-button"></button>
      <div class="verbs__search">
        <input 
          v-model="entry"
          type="text" 
          placeholder="search" 
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

  methods: {
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
    }
  }
}
</script>

<style lang="sass">

.verbs__table
  scroll-behavior: 'smooth'

</style>