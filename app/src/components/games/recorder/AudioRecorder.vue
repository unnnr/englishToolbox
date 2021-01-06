<template>
  <div class="recorder__card recorder__card--record">
    <button 
      class="recorder__card-button"
      :class="{
        'recorder__card-button--record': !!!blob && !!!recording,
        'recorder__card-button--stop': !!!blob && recording,
        'recorder__card-button--pause': blob && playing,
        'recorder__card-button--play': blob && !!!playing  }"

      @click="toggle">
    </button>
      <!-- record your reading the text above -->

    <audio-timeline
      :recording="recording"
      :duration="duration"
      :value="position"
      :src="blob"
      @input="moveto"/>


    <button
      class="recorder__card-button recorder__card-button--rerecord"
      :disabled="!!!blob"
      @click="rerecord">
    </button>
  </div>
</template>


<script>
import AudioTimeline from '@components/games/recorder/AudioTimeline'

export default {
  components: {
    AudioTimeline,
  },

  data() {
    return {
      recording: false,
      recorder: null,

      player: null,
      position: 0,

      playing: false,
      duration: 0,

      blob: null
    }
  },

  mounted() {
    return;
    fetch(this.src)
      .then(response => response.blob())
      .then(blob => this.blob = URL.createObjectURL(blob))
      .then(this.load)
  },

  beforeDestroy() {
    if (this.blob)
      URL.revokeObjectURL(this.blob);
  },

  methods: {
    loadPlayer() {
      this.player = new Audio(this.blob);
      this.player.addEventListener('canplaythrough', this.loaded);
      this.player.addEventListener('timeupdate', this.updateTimeline);
      this.player.addEventListener('ended', this.end);
    },

    loaded() {
      this.duration = this.player.duration;
    },

    end() {
      this.playing = false
    },

    updateTimeline() {
      this.position = this.player.currentTime;
    },

    moveto(timestamp) {
      this.player.currentTime = timestamp;
    },

    async startRecord() {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioChunks = [];
      

      this.recorder = new MediaRecorder(stream);

      this.recorder.addEventListener("dataavailable", ({ data }) =>
        audioChunks.push(data));

      this.recorder.addEventListener("stop", () => {
        let blob = new Blob(audioChunks);
        this.blob = URL.createObjectURL(blob);
        
        this.loadPlayer();
      });

      this.recorder.start();
      this.recording = true;
    },

    stopRecording() {
      if (!!!this.recorder)
        return;

      this.recorder.stop();
      this.recording = false;
    },

    pause() {
      if (!!!this.player)
        return;

      this.player.pause();
      this.playing = false;
    },

    play() {
      if (!!!this.player)
        return;

      this.player.play();
      this.playing = true;
    },

    rerecord() {
      this.pause();
      this.player = null;
      
      URL.revokeObjectURL(this.blob);
      this.blob = null;
    },

    toggle() {
      if (!!!this.blob && !!!this.recording)
        return this.startRecord();

      if (!!!this.blob && this.recording)
        return this.stopRecording();

      if (this.blob && !!!this.playing)
        return this.play();

      if (this.blob && this.playing)
        return this.pause();
    }
  }
}
</script>