<template>
   <section class="games container">
    <div class="games__selected">

      <div class="recorder">
        <h4 class="heading-fourth recorder__title">Audio recorder</h4>
        <p class="text-third recorder__hint">Volutpat libero sodales ultrices fermentum. <br> Lectus purus vitae, molestie suspendisse congue elit. </p>
        <q class="heading-fifth recorder__passage"><i>Amet dui urna, netus duis porttitor. Tortor sed eleifend in in est et pellentesque gravida risus. At quis eget neque, mattis tortor amet dui risus, et.</i></q>
        <div class="recorder__card">
          <button class="recorder__card-button recorder__card-button--record material-icons"></button>
          <div class="recorder__card-status-bar">
            <!-- <p class="recorder__card-status-bar-hint text-second">record your reading the text above</p> -->
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
          </div>
        </div>
        <div class="recorder__card recorder__card--disabled">
          <button class="recorder__card-button recorder__card-button--play material-icons"></button>
          <div class="recorder__card-status-bar">
            <!-- <p class="recorder__card-status-bar-hint text-second">example will be available after recording</p> -->
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
            <div class="recorder__card-status-bar-element"></div>
          </div>
        </div>

        <div class="recorder__button-group">
          <button 
            class="recorder__button recorder__button--prev" 
            :disabled="undoable"
            @click="prev">
            
            prev
          </button>

          <button 
            class="recorder__button recorder__button--next"
            @click="next">
            
            next
          </button>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
import Recorder from '@services/Recorder'

export default {
  data() {
    return {
      sample: {
        audio: null,
        text: null,
      },

      recorded: null,
      undoable: true
    }
  },

  computed: {
    
  },

  methods: {
    prev() {
      this.sample = Recorder.prev();

      this.undoable = this.computeUndoable();
    },

    next() {
      this.sample = Recorder.next();

      this.undoable = this.computeUndoable();
    },

    computeUndoable() {
        return !!!Recorder.history.length;

    }
  }
}
</script>