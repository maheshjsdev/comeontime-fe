import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    constructor() { }

    getIcon(form: FormGroup, controlName: string): string {
        const control: AbstractControl | null = form.get(controlName);

        if (!control) return 'sentiment_very_satisfied'; // default icon

        if (control.invalid && (control.dirty || control.touched)) {
            return 'error'; // error icon
        }

        if (control.valid && (control.dirty || control.touched)) {
            return 'check_circle'; // success icon
        }

        return 'sentiment_very_satisfied'; // untouched/default icon
    }

}
