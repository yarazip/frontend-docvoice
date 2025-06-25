import { Component } from '@angular/core';
import { DragDropComponent } from './drag-drop/drag-drop.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    DragDropComponent,
  ],
})
export class AppComponent {}
