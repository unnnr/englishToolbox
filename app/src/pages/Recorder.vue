<template>
   <section class="games container">
    <div class="games__selected">

      <transition 
        name="slide-right"
        mode="out-in">

        <audio-list
          v-if="menuShown"
          :list="records"
          @select="select"/>

        <div 
          v-else
          class="recorder"
          :key="sample.text">

          <div class="recorder__controls">
            <div class="recorder__button-group">
              <button class="recorder__element recorder__exit-button"></button>
              <button 
                class="recorder__element recorder__menu-button"
                @click="showMenu">
                
                menu
              </button>
            </div>

            <div class="recorder__button-group">
              <button 
                class="recorder__element  recorder__prev-button" 
                :disabled="!!!undoable"
                @click="prev">
                
                prev
              </button>

              <button 
                class="recorder__element  recorder__next-button"
                @click="next">
                
                next
              </button>
            </div>
          </div>
          
          <h5 class="heading-fifth recorder__title">Audio recorder</h5>
          <p class="text-fourth recorder__hint">Click the button below to record your speech and compare it to the sample.</p>
        
          <q class="heading-sixth recorder__passage"><i>{{ sample.text }}</i></q>
        
          <audio-recorder/>
          <audio-player
            :src="sample.audio"/>

        </div>
      </transition>

    </div>
  </section>
</template>

<script>
import AudioRecorder from '@components/games/recorder/AudioRecorder'
import AudioPlayer from '@components/games/recorder/AudioPlayer'
import AudioList from '@components/games/recorder/AudioList'
import Recorder from '@services/Recorder'

export default {
  components: {
    AudioRecorder,
    AudioPlayer,
    AudioList
  },

  data() {
    return {
      sample: {
        audio: null,
        text: null,
      },

      records: [],
      recorder: new Recorder(),

      undoable: true,
      menuShown: false
    }
  },

  beforeMount() {
    this.records = this.recorder.list();
    this.next()
  },

  methods: {
    select(index) {
      this.sample = this.recorder.select(index);
      this.undoable = this.computeUndoable();
      this.menuShown = false;
    },

    showMenu() {
      this.menuShown = true;
    },

    prev() {
      this.sample = this.recorder.prev();
      this.undoable = this.computeUndoable();
    },

    next() {
      this.sample = this.recorder.next();
      this.undoable = this.computeUndoable();
    },

    computeUndoable() {
      return Boolean(this.recorder.history.length);
    }
  }
}
</script>