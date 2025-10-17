import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { Shared } from '../../shared/shared';
import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.scss'
})
export class AdminManagement {
  addUpdateForm: FormGroup;
  userList = signal<any[]>([]);
  refreshTrigger = signal(0);

  constructor(private apiService: ApiService, private sharedServ: Shared, private fb: FormBuilder) {
    this.addUpdateForm = this.fb.group({
      companyName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userRole: ['3']
    });
    effect(() => {
      this.apiService.commonGet('admin').subscribe({
        next: (res) => {
          this.userList.set(res?.data || []);
        },
        error: (err) => {
          this.sharedServ.show('error', false);
        }
      });
    });
  }


  addUpdateClicked() {
    if (this.addUpdateForm.valid) {
      this.apiService.commonPost('/admin/create', this.addUpdateForm.value).subscribe({
        next: (res) => {
          if (res.status === true) {
            this.sharedServ.show(res.message, true);
            this.addUpdateForm.reset();
            // ✅ Directly update the signal with new record
            const currentList = this.userList();
            const newUser = res?.data;
            this.userList.set([...currentList, newUser]);
          } else {
            this.sharedServ.show('Something went wrong', false);
          }
        },
        error: () => {
          this.sharedServ.show('Something went wrong', false);
        }
      });
    } else {
      this.addUpdateForm.markAllAsTouched();
    }
  }

}
