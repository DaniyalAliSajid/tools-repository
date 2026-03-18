export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="tts-input">Text to Read</label>
        <textarea class="input-field" id="tts-input" rows="12" placeholder="Enter text to read aloud..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Voice Configuration</h4>
        <div class="input-group">
          <label for="tts-voice">Speaker Voice</label>
          <select id="tts-voice" class="input-field" style="cursor: pointer;"></select>
        </div>
        <div class="slider-group" style="margin-top: var(--space-4);">
          <div class="slider-group__header">
            <span class="slider-group__label">Pitch Level</span>
            <span class="slider-group__value" id="tts-pitch-val">1</span>
          </div>
          <input type="range" id="tts-pitch" min="0" max="2" step="0.1" value="1">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Playback Control</h3>
      </div>
      
      <div class="result-box" style="padding: var(--space-12); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
        <div id="tts-visualizer" style="display: flex; gap: 4px; height: 60px; align-items: center; margin-bottom: var(--space-8);">
          <div style="width: 6px; height: 20px; background: var(--color-primary); border-radius: 3px; transition: height 0.2s;"></div>
          <div style="width: 6px; height: 40px; background: var(--color-primary); border-radius: 3px; transition: height 0.2s;"></div>
          <div style="width: 6px; height: 30px; background: var(--color-primary); border-radius: 3px; transition: height 0.2s;"></div>
          <div style="width: 6px; height: 50px; background: var(--color-primary); border-radius: 3px; transition: height 0.2s;"></div>
          <div style="width: 6px; height: 25px; background: var(--color-primary); border-radius: 3px; transition: height 0.2s;"></div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); width: 100%; max-width: 300px;">
          <button class="btn btn--primary btn--lg" id="tts-play">🔊 Play</button>
          <button class="btn btn--secondary btn--lg" id="tts-stop">⏹️ Stop</button>
        </div>
      </div>

      <p style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: var(--space-6); text-align: center; line-height: 1.6;">
        <strong>Note:</strong> Available voices depend on your browser and operating system settings.
      </p>
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
