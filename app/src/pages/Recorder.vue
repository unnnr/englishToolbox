<template>
   <section class="games container">
    <div class="games__selected">

      <transition 
        name="slide-right"
        mode="out-in">

        <div class="recorder"
          :key="sample.text">
          <h4 class="heading-fourth recorder__title">Audio recorder</h4>
          <p class="text-fourth recorder__hint">Click the button below to record your speech and compare it to the sample.</p>
        
          <q class="heading-sixth recorder__passage"><i>{{ sample.text }}</i></q>
        
          <audio-recorder/>
          <audio-player
            :src="sample.audio"/>

          <div class="recorder__button-group">
            <button 
              class="recorder__button recorder__button--prev" 
              :disabled="!!!undoable"
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
      </transition>

    </div>
  </section>
</template>

<script>
import AudioRecorder from '@components/games/recorder/AudioRecorder'
import AudioPlayer from '@components/games/recorder/AudioPlayer'
import Recorder from '@services/Recorder'

export default {
  components: {
    AudioRecorder,
    AudioPlayer
  },

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

  mounted() {
    this.next()
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
      return Boolean(Recorder.history.length);
    }
  }
}
</script>