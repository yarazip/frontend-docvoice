import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly apiUrl = 'http://localhost:8080/api/documents/extract-text';

  constructor(private http: HttpClient) {}

  async uploadFile(file: File): Promise<TextExtractionResponseDTO> {
    const formData = new FormData();
    formData.append('file', file);
    return await lastValueFrom(this.http.post<TextExtractionResponseDTO>(this.apiUrl, formData));
  }
}

export type TextExtractionResponseDTO = {
  text: string
}