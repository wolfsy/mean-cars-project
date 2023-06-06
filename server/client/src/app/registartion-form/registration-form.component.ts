import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../_model/users';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Users> = new BehaviorSubject<Users>({} as Users);

  @Output()
  formValuesChanged = new EventEmitter<Users>();

  @Output()
  formSubmitted = new EventEmitter<Users>();

  @Output()
  formCancelled = new EventEmitter<void>();

  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get firstName() { return this.registrationForm.get('firstName')!; }
  get lastName() { return this.registrationForm.get('lastName')!; }
  get emailAddress() { return this.registrationForm.get('emailAddress')!; }
  get phoneNumber() { return this.registrationForm.get('phoneNumber')!; }
  get password() { return this.registrationForm.get('password')!; }
  get validatePassword() { return this.registrationForm.get('validatePassword')!; }

  ngOnInit(): void {
    this.initialState.subscribe(user => {
      this.registrationForm = this.fb.group({
        firstName: [user.firstName, [Validators.required, Validators.maxLength(100)]],
        lastName: [user.lastName, [Validators.required, Validators.maxLength(200)]],
        emailAddress: [user.emailAddress, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber, [Validators.required, Validators.pattern(/^\+48\s\d{3}-\d{3}-\d{3}$/), Validators.maxLength(15)]],
        password: [user.password, [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
        validatePassword: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
    });

    this.registrationForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const validatePassword = control.get('validatePassword')?.value;

    return password === validatePassword ? null : { 'mismatch': true };
  }

  submitRegistrationForm() {
    this.formSubmitted.emit(this.registrationForm.value);
  }

  cancelEditForm() {
    this.formCancelled.emit();
  }
}
