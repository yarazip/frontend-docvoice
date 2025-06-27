import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, catchError, throwError } from 'rxjs';

export type TextExtractionResponseDTO = {
  text: string;
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiUrl = 'http://localhost:8080/api/documents/extract-text';
  private readonly validationUrl = 'http://localhost:8080/api/files/validate';
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(private http: HttpClient) {}

  public async uploadFile(file: File): Promise<TextExtractionResponseDTO> {
    // Validação rápida de tamanho antes de enviar
    if (file.size > this.maxFileSize) {
      throw new Error(`Arquivo muito grande (${(file.size / (1024 * 1024)).toFixed(1)} MB). Máximo: 5 MB`);
    }

    try {
      await this.validateFile(file);

      const formData = new FormData();
      formData.append('file', file);

      return await lastValueFrom(
        this.http.post<TextExtractionResponseDTO>(this.apiUrl, formData)
        .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  private async validateFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await lastValueFrom(
        this.http.post(this.validationUrl, formData, { responseType: 'text' })
        .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      return throwError(() => new Error('Arquivo muito grande ou erro de conexão'));
    }
    if (error.status === 400) {
      return throwError(() => new Error(error.error || 'Arquivo inválido'));
    }
    if (error.status === 413) {
      return throwError(() => new Error('Arquivo muito grande. Máximo: 5MB'));
    }
    if (error.status === 500) {
      return throwError(() => new Error('Erro no servidor ao processar arquivo'));
    }
    
    return throwError(() => new Error(error.error || 'Erro ao processar arquivo'));
  };

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