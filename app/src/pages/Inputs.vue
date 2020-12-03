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


import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/algolia-min.css'


function * range(value) {
  for (let i = 0; i < value; i++) 
    yield i;
}

export default {
  data() {
    return {
      currentColor: '',
      count: 1000,
      colors: [],


			searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
      ),
    }
  },

  mounted() {
    this.test();
  },

  methods: {
    * entropy() {
      function makeColor(colorNum, colors){
        let angles = 360 - CUT_TO + CUT_FROM;

        let angle = colorNum * (angles / colors) % angles;

        if (angle > CUT_FROM)
          (angle += CUT_TO - CUT_FROM) &&  console.log('MOVED', CUT_TO - CUT_FROM, angles);

        console.log(angle);

        return angle;
      }

      const CUT_FROM  = 60;
      const CUT_TO = 160;

      for (let i of range(this.count))
      {
        var color = "hsl( " + makeColor(i, this.count) + ", 60%, 60% )";
        yield color;
      }
    },

    test() {
      this.$refs.wrapper.style.width = 800 + 'px';

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
  bottom: 100px
  left: 100px
  width: 300px
  border-radius: 100%
  overflow: hidden

.colors
  margin: 100px auto
  display: flex
  flex-wrap: wrap
  height: auto

.colors > *
  width: 40px
  height: 40px

</style>