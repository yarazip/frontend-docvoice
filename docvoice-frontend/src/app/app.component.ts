// app.component.ts
import { Component, inject } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FileUploadService, TextExtractionResponseDTO } from './service/file-upload.service';
import { SnackbarService } from './service/snackbar.service';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { TextStorageService } from './service/text-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    AudioPlayerComponent
  ],
})
export class AppComponent {
  public file: File | undefined = undefined;
  public isDragOver: boolean = false;
  public text?: string;
  public isLoading: boolean = false;

  private fileUploadService = inject(FileUploadService);
  private snackbarService = inject(SnackbarService);
  private textStorage = inject(TextStorageService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // URL segura para player de áudio
  public audioUrl?: SafeUrl;
  // URL bruta para download
  private audioDownloadUrl?: string;

  private boundKeyHandler = this.onKeyDown.bind(this);

  public async generateAudio() {
    if (!this.text) {
      this.snackbarService.error('Nenhum texto para converter em áudio.');
      return;
    }

    try {
      const audioBlob = await this.fileUploadService.generateTTS(this.text);
      this.audioDownloadUrl = URL.createObjectURL(audioBlob);
      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(this.audioDownloadUrl);
    } catch (error: any) {
      this.snackbarService.error('Erro ao gerar áudio: ' + error.message);
    }
  }

  public downloadAudio() {
    if (!this.audioDownloadUrl) return;

    const a = document.createElement('a');
    a.href = this.audioDownloadUrl;
    a.download = 'audio-tts.mp3';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Libera a URL para evitar vazamento de memória
    URL.revokeObjectURL(this.audioDownloadUrl);
    this.audioDownloadUrl = undefined;
    this.audioUrl = undefined;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files[0]);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(input.files[0]);
    }
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.boundKeyHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.boundKeyHandler);

    if (this.audioDownloadUrl) {
      URL.revokeObjectURL(this.audioDownloadUrl);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter' && this.file && !this.isLoading) {
      this.handleFiles(this.file);
    }
  }

  private async handleFiles(file: File) {
    try {
      this.isLoading = true;
      this.file = file;
      const dto: TextExtractionResponseDTO = await this.fileUploadService.uploadFile(file);

      this.text = dto.text;
      this.textStorage.setText(this.text);

      this.router.navigate(['/resultado']);
    } catch (err: any) {
      this.snackbarService.error(err);
      this.text = "";
    } finally {
      this.isLoading = false;
    }
  }
}
