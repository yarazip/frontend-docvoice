import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextStorageService {
  private readonly textSignal = signal<string>('');

  setText(text: string) {
    this.textSignal.set(text);
  }

  getText() {
    return this.textSignal();
  }

  clear() {
    this.textSignal.set('');
  }
}
