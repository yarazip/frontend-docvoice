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
  text: string = 'Descrição gerada da imagem ou slide enviado.';

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/']);
  }

  baixarAudio() {
    // futura lógica de download real
    console.log('Baixando áudio...');
  }

  reprocessar() {
    // futura lógica de reprocessamento
    console.log('Reprocessando...');
  }
}
