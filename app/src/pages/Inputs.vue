<template>
  <main> 
    <div class="preview" ref="wrapper">
    </div>
  </main>
</template>

<script>

function * range(value) {
  for (let i = 0; i < value; i++) 
    yield i;
}

export default {
  data() {
    return {
      
    }
  },

  mounted() {
    this.test();
  },

  methods: {
    getRandomNumber() {
      return Math.floor(min + Math.random() * (max - min));
    },


    getTestNumber(min, max) {
      this.$options.counter = typeof this.$options.counter === 'number' ? 
        this.$options.counter + 1 : 0;
      
      switch (this.$options % this.$options.counter) {
        case 0: 
          return this.$options.first;
        case 1: 
          return this.$options.second;
        case 2: 
          return this.$options.third;
      }
    },
    
    generate() {
      function getNumber(min, max) {
        return Math.floor(min + Math.random() * (max - min));
      }

      const MIN_DIFFERENCE = 20;
      const FROM = 40;
      const TO = 250;
      
      let first = getNumber(FROM, TO);
      let second = getNumber(FROM, TO);
      let third;

      // One of the three nodes must be different from the others.
      // So if 'first node' and 'second node' are simiral
      // we need to ensure that third will be different
      if (Math.abs(first - second) < MIN_DIFFERENCE) {
        let average = (first + second) / 2;

        // To generate different from first and second value
        // we need to pick it from two ranges
        // [FROM, average - MIN_DIFFERENCE] U [average + MIN_DIFFERENCE, TO]
        
        // By default  MIN_DIFFERENCE * 2 < TO - FROM, 
        // so we dont consider other cases

        if (average + MIN_DIFFERENCE <= TO)
          third = 
            getNumber(average + MIN_DIFFERENCE, TO);
        else 
         third = 
            getNumber(FROM, average - MIN_DIFFERENCE);
      }
      else 
        third = getNumber(FROM, TO);

      return '#' + first.toString(16)
                 + second.toString(16)
                 + third.toString(16);
    },

    * entropy() {
      const MIN_DIFFERENCE = 15;
      const FROM = 80;
      const TO = 250;

      const STEP = 10;
      
      let count = Math.floor((TO - FROM) / STEP);
      let nodes = [];

      for (let first of range(count)) {
        nodes[0] = FROM + first * STEP;

        for (let second of range(count)) {
          nodes[1] = FROM + second * STEP;

          for (let third of range(count)) {
            nodes[2] = FROM + third * STEP;

            if (Math.abs(nodes[0] - nodes[1]) < MIN_DIFFERENCE) {
              console.log('collision: ' + first + '  ' + second);
              break;
            }
            
            yield '#' + nodes[0].toString(16).padStart(2, '0')
                      + nodes[1].toString(16).padStart(2, '0')
                      + nodes[2].toString(16).padStart(2, '0') ;
          }
        }
      }
    },

    test() {
      for (let value of this.entropy()) {
        let element = document.createElement('div');

        console.log(value);
        
        element.style.background = value;
        this.$refs.wrapper.appendChild(element);
      }

    },

    reset() {
      this.test();
    }
  }
}
</script>

<style lang="sass">

.preview
  margin: 100px auto
  width: 80%
  display: flex
  flex-wrap: wrap
  height: auto

.preview > *
  width: 40px
  height: 40px

</style>