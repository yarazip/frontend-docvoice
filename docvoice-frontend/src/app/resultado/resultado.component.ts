import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  standalone: true,
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
  imports: [CommonModule, AudioPlayerComponent],
})
export class ResultadoComponent {
  text: string = 'Descrição do slide ou conteúdo extraído.';

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/']);
  }

  reprocessar() {
    // TODO: Implement the reprocessing logic here.
    console.log('Reprocessando...');
  }

  baixarAudio() {
    // lógica de download do áudio
    console.log('Baixando áudio...');
  }
}
