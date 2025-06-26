import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultadoComponent } from './resultado/resultado.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'resultado', component: ResultadoComponent },
  { path: '**', redirectTo: '' }
];