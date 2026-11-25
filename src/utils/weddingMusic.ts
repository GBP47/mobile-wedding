// Gentle felt-piano ambient wedding melody using Web Audio API (no external audio file dependency)

interface NoteEvent {
  freq: number;
  durationSec: number;
}

// Warm D-major progression (D - A - Bm - F#m - G - D - G - A)
const MELODY_SEQUENCE: NoteEvent[] = [
  { freq: 293.66, durationSec: 1.0 }, // D4
  { freq: 440.0, durationSec: 1.0 },  // A4
  { freq: 587.33, durationSec: 1.0 }, // D5
  { freq: 554.37, durationSec: 1.0 }, // C#5
  { freq: 493.88, durationSec: 1.0 }, // B4
  { freq: 369.99, durationSec: 1.0 }, // F#4
  { freq: 440.0, durationSec: 1.0 },  // A4
  { freq: 392.0, durationSec: 1.0 },  // G4

  { freq: 392.0, durationSec: 1.0 },  // G4
  { freq: 493.88, durationSec: 1.0 }, // B4
  { freq: 587.33, durationSec: 1.0 }, // D5
  { freq: 440.0, durationSec: 1.0 },  // A4
  { freq: 392.0, durationSec: 1.0 },  // G4
  { freq: 369.99, durationSec: 1.0 }, // F#4
  { freq: 329.63, durationSec: 2.0 }, // E4
];

class WeddingMusicPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private noteIndex = 0;
  private playing = false;
  private customAudio: HTMLAudioElement | null = null;
  private customUrl: string | null = null;

  public isPlaying(): boolean {
    return this.playing;
  }

  public setCustomAudioFile(file: File): void {
    this.stop();
    if (this.customUrl) {
      URL.revokeObjectURL(this.customUrl);
    }
    this.customUrl = URL.createObjectURL(file);
    const audio = new Audio(this.customUrl);
    audio.loop = true;
    audio.volume = 0.5;
    this.customAudio = audio;
  }

  public async toggle(): Promise<boolean> {
    if (this.playing) {
      this.stop();
      return false;
    }
    await this.start();
    return true;
  }

  public async start(): Promise<void> {
    if (this.playing) return;

    if (this.customAudio) {
      await this.customAudio.play();
      this.playing = true;
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.16;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1150;

      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.value = 0.34;
      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.24;

      filter.connect(this.masterGain);
      filter.connect(delay);
      delay.connect(delayFeedback);
      delayFeedback.connect(delay);
      delay.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.filterNode = filter;
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.playing = true;
    this.scheduleNextNote();
  }

  private filterNode: BiquadFilterNode | null = null;

  private scheduleNextNote(): void {
    if (!this.playing || !this.ctx || !this.filterNode) return;

    const note = MELODY_SEQUENCE[this.noteIndex % MELODY_SEQUENCE.length];
    this.playSoftPianoTone(note.freq, note.durationSec);
    this.noteIndex += 1;

    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, note.durationSec * 920);
  }

  private playSoftPianoTone(freq: number, durationSec: number): void {
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;

    const oscPrimary = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    oscPrimary.type = 'sine';
    oscPrimary.frequency.setValueAtTime(freq, now);

    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 0.5, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.value = 0.28;

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.65, now + 0.045);
    env.gain.exponentialRampToValueAtTime(0.001, now + durationSec * 1.45);

    oscPrimary.connect(env);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(env);
    env.connect(this.filterNode);

    oscPrimary.start(now);
    oscHarmonic.start(now);
    oscPrimary.stop(now + durationSec * 1.5);
    oscHarmonic.stop(now + durationSec * 1.5);
  }

  public stop(): void {
    this.playing = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }
}

export const weddingMusicPlayer = new WeddingMusicPlayer();
