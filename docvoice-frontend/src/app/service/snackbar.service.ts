import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string, action: string = 'Fechar', duration: number = 5000, panelClass: string[] = ['snackbar-error']) {
    this.snackBar.open(message, action, {
      duration,
      panelClass
    });
  }
}
