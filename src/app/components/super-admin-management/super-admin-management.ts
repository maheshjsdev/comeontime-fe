import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Shared } from '../../shared/shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-admin-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './super-admin-management.html',
  styleUrl: './super-admin-management.scss'
})
export class SuperAdminManagement {
  addUpdateForm: FormGroup;
  userList = signal<any[]>([]);
  isModalOpen = signal(false);
  isDeleteModal = signal(false);
  formHeading: string = 'Add Super Admin';
  formBtn: string = 'Submit';
  editId: string = '0';
  deleteId: string = '0';
  userId: string = '';

  constructor(private apiService: ApiService, private sharedServ: Shared, private fb: FormBuilder) {
    this.addUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
    effect(() => {
      this.apiService.commonGet('/superadmin').subscribe({
        next: (res) => {
          this.userList.set(res?.data || []);
        },
        error: (err) => {
          this.sharedServ.show('error', false);
        }
      });
    });
  }
  openModal(id?: string) {
    this.editId = id || '0';
    this.isModalOpen.set(true);
    if (id === '0') {
      this.formHeading = 'Add Super Admin';
      this.formBtn = 'Submit';
    } else {
      this.formHeading = 'Update Super Admin';
      this.formBtn = 'Update';
      const selectedUser = this.userList()?.find(user => user._id === id);
      this.userId = selectedUser?._id || '';
      if (selectedUser) {
        this.addUpdateForm.patchValue(selectedUser)
      }

    }
  }
  isDeleteModalOpen(ele?: string) {
    this.deleteId = ele || '';
    this.isDeleteModal.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isDeleteModal.set(false);
    this.addUpdateForm.reset();
    this.addUpdateForm.markAsUntouched();
    this.addUpdateForm.markAsPristine();
  }


  addUpdateClicked() {
    if (this.addUpdateForm.valid) {
      if (this.editId === '0') {
        this.apiService.commonPost('/superadmin/create', this.addUpdateForm.value).subscribe({
          next: (res) => {
            if (res.status === true) {
              this.sharedServ.show(res.message, true);
              const currentList = this.userList();
              const newUser = res?.data;
              this.userList.set([...currentList, newUser]);
              this.addUpdateForm.reset();
              this.closeModal();
            } else {
              this.sharedServ.show('Something went wrong', false);
            }
          },
          error: () => {
            this.sharedServ.show('Something went wrong', false);
          }
        });
      } else {
        const dataObj = this.addUpdateForm.value;
        dataObj._id = this.userId;
        this.apiService.commonPost('/superadmin/create', dataObj).subscribe({
          next: (res) => {
            if (res.status === true) {
              const currentList = this.userList();
              const newUser = res?.data;
              const updatedUser = currentList.map(user => user._id === newUser._id ? newUser : user);
              this.userList.set(updatedUser);
              this.sharedServ.show(res.message, true);
              this.addUpdateForm.reset();
              this.closeModal();
            } else {
              this.sharedServ.show('Something went wrong', false);
            }
          },
          error: () => {
            this.sharedServ.show('Something went wrong', false);
          }
        });
      }
    } else {
      this.addUpdateForm.markAllAsTouched();
    }
  }
  deleteClicked() {
    const dataObj = { _id: this.deleteId };
    this.apiService.commonPost('/superadmin/delete', dataObj).subscribe({
      next: (res) => {
        if (res.status === true) {
          const updatedList = this.userList().filter(user => user._id !== this.deleteId);
          this.userList.set(updatedList);

          this.sharedServ.show(res.message, true);
          this.closeModal();
        } else {
          this.sharedServ.show('Something went wrong', false);
        }
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Something went wrong';
        this.sharedServ.show(errorMsg, false);
      }
    });
  }
}
