import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { Shared } from '../../shared/shared';
import { Component, effect, signal } from '@angular/core';


@Component({
  selector: 'app-admin-management',
  imports: [CommonModule],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.scss'
})
export class AdminManagement {
  userList = signal<any[]>([]);

  constructor(private apiService: ApiService, private sharedServ: Shared) {
    this.getData();
  }

  getData() {
    this.apiService.commonGet('admin').subscribe({
      next: (res) => {
        this.userList.set(res?.data || []);
      },
      error: (err) => {
        let errorMessage = 'Something went wrong. Please try again.';
        if (err?.status === 0) {
          errorMessage = 'Cannot connect to server. Please check your internet connection.';
        } else if (err?.status === 400) {
          errorMessage = err?.error?.message || 'Invalid request.';
        } else if (err?.status === 401) {
          errorMessage = 'Invalid. Check your credentials.';
        } else if (err?.status === 500) {
          errorMessage = err?.error?.message || 'Internal server error.';
        }
        this.sharedServ.show(errorMessage, false);
      }
    });
  }

}
