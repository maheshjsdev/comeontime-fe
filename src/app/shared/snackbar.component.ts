import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from './material-module';

@Component({
  selector: 'app-snackbar',
   imports: [MaterialModule],
  template: `
    <div style="display:flex; align-items:center; gap:8px;">
      <mat-icon>{{data.icon}}</mat-icon>
      <span>{{data.message}}</span>
    </div>
  `
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
