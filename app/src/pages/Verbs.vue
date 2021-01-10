<template>
  <section class="games container">
    <div class="games__selected">

      <div class="verbs">
        <div class="verbs__button-group">
          <button class="verbs__element verbs__exit-button"></button>
          <div class="verbs__search">
            <input type="text" placeholder="search">
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
                :key="index">
                <td>{{index + 1}}</td>
                <td>{{ first }}</td>
                <td>{{ second }}</td>
                <td>{{ third }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      verbs: [
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
        ['be', 'was, were', 'been'],
      ]
    }
  }
}
</script>