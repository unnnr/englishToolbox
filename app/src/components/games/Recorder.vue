<template>
  <div class="game recorder">
    <transition 
      name="slide-right"
      mode="out-in">

      <audio-list
        v-if="menuShown"
        :list="records"
        @select="select"/>

      <div 
        v-else
        :key="sample.text"
        class="recorder__body">

        <div class="game__controls">
          <div class="game__elements">
            <button class="game__element game__element--exit"></button>
            <button 
              class="game__element game__element--menu"
              @click="showMenu">
              
              menu
            </button>
          </div>

          <div class="game__elements">
            <button 
              class="game__element game__element--prev" 
              :disabled="!!!undoable"
              @click="prev">
              
              prev
            </button>

            <button 
              class="game__element game__element--next"
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
      menuShown: true
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

<style lang="sass" scoped>

</style>