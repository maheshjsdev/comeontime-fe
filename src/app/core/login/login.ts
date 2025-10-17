import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../shared/material-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../shared/form-validation.service';
import { ApiService } from '../../shared/api.service';
import { Shared } from '../../shared/shared';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, public validationService: FormValidationService, private apiService: ApiService,
    private sharedServ: Shared,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(19),
          Validators.pattern('^[A-Z0-9]+$')
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get userId() {
    return this.loginForm.get('userId');
  }

  get password() {
    return this.loginForm.get('password');
  }
  // hide = signal(true);
  // clickEvent(event: MouseEvent) {
  //   this.hide.set(!this.hide());
  //   event.stopPropagation();
  // }
  hide = true;

  togglePassword() {
    this.hide = !this.hide;
  }
  loginClicked() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const dataObj = this.loginForm.value;

    this.apiService.commonPostWithoutToken('token', dataObj).subscribe({
      next: (res) => {
        if (res?.token) {
          if (res.status === true) {
            localStorage.setItem('token', res.token);
            sessionStorage.setItem('isAuthenticated', '1');
            this.sharedServ.show('Successfully logged in', true)
            this.router.navigateByUrl('/dashboard')
          }

        }
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

        this.sharedServ.show(errorMessage, false)
      }
    });
  }

}
