<template>
  <div class="matcher__results">
      <div class="matcher__results-body">
        <div class="matcher__results-scrollable">
          <h4 class="matcher__results-heading heading-fourth">
            well done!
          </h4>
          <p class="matcher__results-time text-fourth">
            Your time: <span> {{ time }}</span>
          </p>
          
          <table class="matcher__results-table">
            <tr>
              <th>№</th>
              <th>infinitive</th>
              <th>past simple</th>
              <th>past participle</th>
            </tr>

            <tr 
              v-for="([first, second, third], index) in parsed"
              :key="index">

                <td>{{ index }}.</td>
                <td>{{ first }}</td>
                <td>{{ second }}</td>
                <td>{{ third }}</td>
              </tr>
          </table>
          
          <button 
            class="matcher__results-restart-button button-secondary"
            @click="restart">
            
            again
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    seconds: { type: Number, default: null },

    words: { type: Array, default: () => [] },
  },

  computed: {
    time() {
      let seconds = this.seconds;
      let minutes =  Math.floor(seconds / 60);

      seconds = seconds - 60 * minutes;
      
      seconds = seconds.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');


      return `${minutes}:${seconds}`;
    },

    parsed() {
      let words = this.words;
      let parsed = [];

      for (let i = 0; i< words.length; i++) {
        let group = words[i];

        if (!!!parsed[group.key])
          parsed[group.key] = [];
          
        parsed[group.key].push(group.verb)
      }

      return parsed;
    }
  },

  methods: {
    restart() {
      this.$emit('restart');
    }
  }
}
</script>