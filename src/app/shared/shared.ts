import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class Shared {
   private _snackBar = inject(MatSnackBar);

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  show(message: string, state: boolean = true) {
    const icon = state ? 'check_circle' : 'error';
    const color = state ? '#4caf50' : '#f44336';

    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message, icon, color },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['custom-snackbar'],
      duration: 3000
    });
  }
}
