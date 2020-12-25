<template>
  <canvas 
    ref="canvas"
    class="whiteboard__canvas"
    :height="height"
    :width="width"/>
</template>

<script>
export default {
  inject: ['$drawings', '$config'], 

  computed: {
    drawings() {
      return this.$drawings();
    },

    collection() {
      return this.drawings.collection()
    },

    config() {
      return this.$config();
    },
    
    width() {
      return this.config.width
    },
        
    height() {
      return this.config.height
    },
  },

  watch: {
    collection() {
      this.draw();
    }
  },

  mounted() {
    this.context = this.$refs.canvas.getContext("2d");

    this.draw();
  },

  methods: {
    clear() {
      this.context.clearRect(0, 0, this.width, this.height);
    },

    draw() {
      this.clear();

      for (let el of this.collection) {
        let type = el.body.type;
        let data = el.body;

        switch (type) {
          case 'rect' : this.drawRect(data); break;
          case 'pencil' : this.drawLine(data); break;
          case 'ellipse' : this.drawEllipse(data); break;
          case 'pollygon' : this.drawPolygon(data); break;
          case 'triangle' : this.drawTriangle(data); break;
        }
      }
    },

    drawRect(data) {
      console.log('rect')
    },

    drawLine(data) {
      console.log(data);

      this.context.beginPath();
      this.context.strokeStyle = data.color;
      this.context.lineWidth = data.size;
      this.context.lineJoin = 'round';
      this.context.lineCap = 'round';

      let x = data.path.x[0];
      let y = data.path.y[0];
      
      this.context.moveTo(x, y);

      for (let i = 1;  i < data.path.x.length; i++) {
        x += data.path.x[i];
        y += data.path.y[i];

        console.log(x, y);

        this.context.lineTo(x, y);
      }

      this.context.stroke();
    },

    drawEllipse(data) {

    },

    drawPolygon(data) {

    },

    drawTriangle(data) {

    }
  }
}
</script>

<style lang="sass">

.whiteboard__canvas
  position: relative
  height: 100%
  width: 100%
  
</style>