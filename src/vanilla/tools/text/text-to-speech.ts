export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="tts-input">Text to Speak</label>
        <textarea class="input-field" id="tts-input" rows="5" placeholder="Enter text to read aloud..."></textarea>
      </div>

      <div class="tool-grid-2">
        <div class="input-group">
          <label for="tts-voice">Voice</label>
          <select id="tts-voice" class="input-field"></select>
        </div>
        <div class="input-group">
          <label for="tts-pitch">Pitch: <span id="tts-pitch-val">1</span></label>
          <input type="range" id="tts-pitch" min="0" max="2" step="0.1" value="1">
        </div>
      </div>

      <div style="display: flex; gap: var(--space-4);">
        <button class="btn btn--primary" id="tts-play">Play Audio</button>
        <button class="btn btn--secondary" id="tts-stop">Stop</button>
      </div>
    </div>
  `;

    const input = document.getElementById('tts-input') as HTMLTextAreaElement;
    const voiceSelect = document.getElementById('tts-voice') as HTMLSelectElement;
    const pitch = document.getElementById('tts-pitch') as HTMLInputElement;
    const pitchVal = document.getElementById('tts-pitch-val')!;
    const playBtn = document.getElementById('tts-play')!;
    const stopBtn = document.getElementById('tts-stop')!;

    let voices: SpeechSynthesisVoice[] = [];

    const loadVoices = () => {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = voices
            .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
            .join('');
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    pitch.addEventListener('input', () => {
        pitchVal.textContent = pitch.value;
    });

    playBtn.addEventListener('click', () => {
        if (!input.value.trim()) return;
        const utterance = new SpeechSynthesisUtterance(input.value);
        utterance.voice = voices[parseInt(voiceSelect.value)];
        utterance.pitch = parseFloat(pitch.value);
        window.speechSynthesis.speak(utterance);
    });

    stopBtn.addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });
}
