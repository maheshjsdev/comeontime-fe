import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Shared {
  public _snackBar = inject(MatSnackBar);

  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

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
  isAuthenticated = signal(false);
  isAuthAccess = signal(localStorage.getItem('isAuthAccess') === '1');
  setAuth(isAuth: boolean) {
    this.isAuthenticated.set(isAuth);
    this.isAuthAccess.set(isAuth);

    if (isAuth) {
      localStorage.setItem('isAuthAccess', '1');
    } else {
      localStorage.removeItem('isAuthAccess');
    }
  }
}
