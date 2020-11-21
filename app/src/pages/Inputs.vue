<template>
  <main> 

    <object class="preview">
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect id="background" :fill="currentColor" width="100%" height="100%"/> 
        <path d="M250 91.2C194.1 91.2 148.9 136.4 148.9 192.3C148.9 248.2 194.1 293.4 250 293.4C305.9 293.4 351.1 248.2 351.1 192.3C351.1 136.4 305.9 91.2 250 91.2Z" fill="white"/>
        <path d="M447.8 402.9C424.8 432.6 395.3 457 361.4 473.9C327.9 490.6 290 500 250 500C210 500 172.1 490.6 138.6 473.9C104.7 457 75.2 432.6 52.2 402.9C75.9 349.2 189.8 322.2 250 322.2C310.2 322.2 424.1 349.2 447.8 402.9Z" fill="white"/>
      </svg>
    </object>

    <div class="colors" ref="wrapper">
      
      <div 
        v-for="(color, key) in colors"
        :key="key"
        :style="{'background-color': color}"
        @mouseover="() => currentColor = color">
      </div>

    </div>
  </main>
</template>

<script>

const MIN_DIFFERENCE = 0;
const FROM = 120;
const TO = 200;

const STEP = 10;

function * range(value) {
  for (let i = 0; i < value; i++) 
    yield i;
}

export default {
  data() {
    return {
      currentColor: '',
      count: 1000,
      colors: []
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
      const TO = 220;
      
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
      function makeColor(colorNum, colors){
        if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
        return colorNum * (360 / colors) % 360;
      }


      for (let i of range(this.count))
      {
        var color = "hsl( " + makeColor(i, this.count) + ", 70%, 60% )";
        yield color;
      }

      return;

      let count = Math.floor((TO - FROM) / STEP);
      let nodes = [];

      for (let first of range(count)) {
        nodes[0] = FROM + first * STEP;

        for (let second of range(count)) {
          nodes[1] = FROM + second * STEP;

          for (let third of range(count)) {
            nodes[2] = FROM + third * STEP;

            if (Math.abs(nodes[0] - nodes[1]) < MIN_DIFFERENCE) {
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
      this.$refs.wrapper.style.width = Math.floor((TO - FROM) / STEP) * 40 + 'px';

      for (let value of this.entropy()) {
        this.colors.push(value)
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
  position: fixed
  width: 300px
  top: 100px
  left: 100px

.colors
  margin: 100px auto
  display: flex
  flex-wrap: wrap
  height: auto

.colors > *
  width: 40px
  height: 40px

</style>