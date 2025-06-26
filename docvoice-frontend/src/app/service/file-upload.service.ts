import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export type TextExtractionResponseDTO = {
  text: string;
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiUrl = 'http://localhost:8080/api/documents/extract-text';

  constructor(private http: HttpClient) {}

  public async uploadFile(file: File): Promise<TextExtractionResponseDTO> {
    const formData = new FormData();
    formData.append('file', file);
    return await lastValueFrom(this.http.post<TextExtractionResponseDTO>(this.apiUrl, formData));
  }

  public async generateTTS(text: string): Promise<Blob> {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('Failed to generate TTS audio');
    }

    return await response.blob();
  }
}
