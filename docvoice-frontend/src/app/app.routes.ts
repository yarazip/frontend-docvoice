import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

export const routes: Routes = [
  { path: '', component: AudioPlayerComponent },
  { path: 'resultado', component: ResultadoComponent },
  { path: '**', redirectTo: '' }
];
