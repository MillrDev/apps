<template>
  <div class="mp" :data-state="state">
    <!-- LEFT: transport buttons + volume -->
    <div class="mp-left">
      <div class="mp-buttons">
        <button
          type="button"
          class="mp-btn"
          title="Stop"
          aria-label="Stop"
          @click="stop"
        >
          <svg viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        </button>
        <button
          type="button"
          class="mp-btn"
          title="Previous"
          aria-label="Previous"
          @click="prev"
        >
          <svg viewBox="0 0 24 24">
            <path d="M17 5v14L8 12z" />
            <rect x="5" y="5" width="3" height="14" />
          </svg>
        </button>
        <button
          type="button"
          class="mp-btn"
          title="Pause"
          aria-label="Pause"
          @click="pause"
        >
          <svg viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        </button>
        <button
          type="button"
          class="mp-btn mp-btn-play"
          title="Play"
          aria-label="Play"
          @click="play"
        >
          <svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" /></svg>
        </button>
        <button
          type="button"
          class="mp-btn"
          title="Next"
          aria-label="Next"
          @click="next"
        >
          <svg viewBox="0 0 24 24">
            <path d="M7 5v14l9-7z" />
            <rect x="16" y="5" width="3" height="14" />
          </svg>
        </button>
      </div>

      <div class="mp-volume">
        <svg class="mp-speaker" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9v6h4l5 4V5L7 9z" />
          <path
            d="M15 8c1.5 1 1.5 7 0 8M17.5 5.5c3 2.5 3 10.5 0 13"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
        </svg>
        <input
          type="range"
          class="mp-range"
          min="0"
          max="100"
          aria-label="Volume"
          :value="volume"
          @input="onVolume"
        />
      </div>
      <div
        class="mp-leds"
        :style="{ '--vol': volume + '%' }"
        aria-hidden="true"
      ></div>
    </div>

    <!-- RIGHT: display + seek -->
    <div class="mp-right">
      <div class="mp-display">
        <div class="mp-info">
          <div class="mp-title">{{ currentTrack.title }}</div>
          <div class="mp-artist">{{ currentTrack.artist }}</div>
          <div class="mp-status">{{ state }}</div>
        </div>

        <div class="mp-eq" aria-hidden="true">
          <i
            v-for="(level, i) in levels"
            :key="i"
            :style="{ '--level': level }"
          ></i>
        </div>
      </div>

      <div class="mp-seekrow">
        <span class="mp-time">{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          class="mp-range"
          min="0"
          max="100"
          step="0.1"
          aria-label="Seek"
          :value="progress"
          @input="onSeek"
        />
        <span class="mp-time mp-time-total">{{ formatTime(duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",

  props: {
    // [{ title, artist, src }]
    playlist: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      index: 0,
      state: "stopped", // 'stopped' | 'playing' | 'paused'
      volume: 70,
      currentTime: 0,
      duration: 0,
      levels: Array(9).fill(0), // each 0..1, feeds the equalizer bars
    };
  },

  computed: {
    currentTrack() {
      return this.playlist[this.index] || { title: "", artist: "", src: "" };
    },
    progress() {
      return this.duration ? (this.currentTime / this.duration) * 100 : 0;
    },
  },

  created() {
    // Not reactive on purpose: these are plain objects Vue shouldn't proxy.
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
    this.audio.volume = this.volume / 100;
    this.ctx = null;
    this.gain = null;
    this.analyser = null;
    this.freqData = null;
    this.raf = null;

    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
    });
    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio.duration;
    });
    this.audio.addEventListener("ended", this.next);

    this.loadTrack(0);
  },

  beforeUnmount() {
    // Vue 2: rename this hook to beforeDestroy
    cancelAnimationFrame(this.raf);
    this.audio.pause();
    this.audio.src = "";
    if (this.ctx) this.ctx.close();
  },

  methods: {
    /* ---------- Buttons ---------- */
    play() {
      if (this.currentTrack.src) {
        this.initAnalyser();
        this.ctx.resume();
        this.audio.play();
      }
      this.setState("playing");
    },
    pause() {
      this.audio.pause();
      if (this.state === "playing") this.setState("paused");
    },
    stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.currentTime = 0;
      this.setState("stopped");
    },
    next() {
      this.skip(1);
    },
    prev() {
      this.skip(-1);
    },
    skip(step) {
      const wasPlaying = this.state === "playing";
      this.loadTrack(this.index + step);
      if (wasPlaying) this.play();
    },

    /* ---------- Track / state ---------- */
    loadTrack(i) {
      const len = this.playlist.length;
      this.index = (i + len) % len;
      this.audio.src = this.currentTrack.src || "";
      this.currentTime = 0;
      this.duration = 0;
    },
    setState(state) {
      this.state = state;
      cancelAnimationFrame(this.raf);
      if (state === "playing") this.tick();
      else if (state === "stopped") this.levels = Array(9).fill(0);
      else this.levels = Array(9).fill(0.05);
    },

    /* ---------- Equalizer ---------- */
    initAnalyser() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.75;

      this.gain = this.ctx.createGain();
      this.gain.gain.value = this.volume / 100;
      this.audio.volume = 1; // the gain node handles volume from here on

      this.ctx.createMediaElementSource(this.audio).connect(this.analyser);
      this.analyser.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    },
    tick() {
      if (this.state !== "playing") return;

      if (this.analyser) {
        this.analyser.getByteFrequencyData(this.freqData);
        this.levels = this.levels.map((_, i) => this.freqData[i + 1] / 255);
      } else {
        // no audio source: fake levels so you can preview the styling
        this.levels = this.levels.map((v) =>
          Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.5)),
        );
      }
      this.raf = requestAnimationFrame(this.tick);
    },

    /* ---------- Sliders ---------- */
    onSeek(e) {
      if (!this.duration) return;
      this.audio.currentTime = (e.target.value / 100) * this.duration;
    },
    onVolume(e) {
      this.volume = Number(e.target.value);
      if (this.gain) this.gain.gain.value = this.volume / 100;
      else this.audio.volume = this.volume / 100;
    },

    /* ---------- Helpers ---------- */
    formatTime(s) {
      if (!isFinite(s)) return "00:00";
      const m = String(Math.floor(s / 60)).padStart(2, "0");
      const sec = String(Math.floor(s % 60)).padStart(2, "0");
      return `${m}:${sec}`;
    },
  },
};
</script>

<!-- Reuse the same stylesheet from before. Not scoped, so the classes match. -->
<style src="../../assets/myspace/myspace-style.css"></style>
