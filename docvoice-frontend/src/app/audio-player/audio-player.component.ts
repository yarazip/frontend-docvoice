import { Component, input, OnDestroy, signal,} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-player',
  imports: [FormsModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent implements OnDestroy {
  textContent = input.required<string>();

  public readonly isSpeaking = signal(false);

  private utterance: SpeechSynthesisUtterance | null = null;

  public speak(): void {

    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    this.utterance = new SpeechSynthesisUtterance(this.textContent());

    this.utterance.lang = 'pt-BR';

    this.utterance.onend = () => {
      this.isSpeaking.set(false);
      this.utterance = null;
    };

    this.isSpeaking.set(true);

    window.speechSynthesis.speak(this.utterance);
  }

  public stop(): void {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    this.isSpeaking.set(false);
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
