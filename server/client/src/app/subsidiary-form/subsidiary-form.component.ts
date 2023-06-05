import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Subsidiary } from '../_model/subsidiary';

@Component({
  selector: 'app-subsidiary-form',
  templateUrl: './subsidiary-form.component.html',
  styleUrls: ['./subsidiary-form.component.css']
})

export class SubsidiaryFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Subsidiary> = new BehaviorSubject<Subsidiary>({} as Subsidiary);

  @Output()
  formValuesChanged = new EventEmitter<Subsidiary>();

  @Output()
  formSubmitted = new EventEmitter<Subsidiary>();

  @Output()
  formCancelled = new EventEmitter<void>();

  subsidiaryForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get manager() { return this.subsidiaryForm.get('manager')!; }
  get address() { return this.subsidiaryForm.get('address')!; }
  get phoneNumber() { return this.subsidiaryForm.get('phoneNumber')!; }
  get emailAddress() { return this.subsidiaryForm.get('emailAddress')!; }

  ngOnInit() {
    this.initialState.subscribe(subsidiary => {
      this.subsidiaryForm = this.fb.group({
        manager: [subsidiary.manager, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        address: [subsidiary.address, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        phoneNumber: [subsidiary.phoneNumber, [Validators.required, Validators.pattern(/^\+48\s\d{3}-\d{3}-\d{3}$/), Validators.maxLength(15)]],
        emailAddress: [subsidiary.emailAddress, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]]
      });
    });

    this.subsidiaryForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.subsidiaryForm.value);
  }

  cancelEditForm() {
    this.formCancelled.emit();
  }
}
