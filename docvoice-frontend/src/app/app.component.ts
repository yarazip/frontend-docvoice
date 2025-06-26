import { Component, inject } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FileUploadService, TextExtractionResponseDTO } from './service/file-upload.service';
import { SnackbarService } from './service/snackbar.service';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  private fileUploadService = inject(FileUploadService)
  private snackbarService = inject(SnackbarService);

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
    if(files) this.handleFiles(files[0]);
  }

  onFileSelect(event: any) {
    const files = event.target.files;

    if(files) this.handleFiles(files[0]);
  }

  private async handleFiles(file: File) {
    try {
      this.isLoading = true;
      this.file = file;
      const dto = await this.fileUploadService.uploadFile(file);
      this.text = dto.text;
    } catch (err: any) {
      this.snackbarService.error(err)
      this.text = "";
    } finally {
      this.isLoading = false;
    }
  }
}