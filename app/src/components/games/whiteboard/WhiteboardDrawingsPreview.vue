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
          case 'pencil' : this.drawLine(data); break;
          case 'eraser' : this.drawEraser(data); break;
          case 'ellipse' : this.drawEllipse(data); break;
          case 'polygon' : this.drawPolygon(data); break;
          case 'triangle' : this.drawTriangle(data); break;
          case 'rectangle' : this.drawRect(data); break;
        }
      }
    },

    drawRect(data) {
      this.context.fillStyle = data.color;
      this.context.fillRect(data.x, data.y,
                            data.width, data.height);
    },

    drawEraser(data) {
      data.color = 'white'
      this.drawLine(data);
    },

    drawLine(data) {
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

        this.context.lineTo(x, y);
      }

      this.context.stroke();
    },

    drawEllipse(data) {
      this.context.fillStyle = data.color;
      this.context.ellipse(
        data.x, data.y, data.radiusX, data.radiusY, 0, 0, 2 * Math.PI);

      this.context.fill();
    },

    drawPolygon(data) {
      this.context.beginPath();

      let x = data.path[0].x;
      let y = data.path[0].y;
      
      this.context.moveTo(x, y);

      for (let {x, y} of data.path.slice(1))
        this.context.lineTo(x, y);

      this.context.fillStyle = data.color;
      this.context.fill();
    },

    drawTriangle(data) {
      this.context.beginPath();

      this.context.moveTo(data.path[0].x, data.path[0].y);
      this.context.lineTo(data.path[1].x, data.path[1].y);
      this.context.lineTo(data.path[2].x, data.path[2].y);

      this.context.fillStyle = data.color;
      this.context.fill();
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