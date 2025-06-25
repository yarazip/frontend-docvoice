import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(NgxFileDropModule)
  ]
}).catch(err => console.error(err));