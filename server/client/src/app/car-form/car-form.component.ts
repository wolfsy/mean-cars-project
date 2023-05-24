import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../_model/car';

const currentYear = new Date().getFullYear();

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})

export class CarFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Car> = new BehaviorSubject<Car>({} as Car);

  @Output()
  formValuesChanged = new EventEmitter<Car>();

  @Output()
  formSubmitted = new EventEmitter<Car>();

  @Output()
  formCancelled = new EventEmitter<void>();

  carForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get vin() { return this.carForm.get('vin')!; }
  get brand() { return this.carForm.get('brand')!; }
  get model() { return this.carForm.get('model')!; }
  get year_of_production() { return this.carForm.get('year_of_production')!; }
  get task_type() { return this.carForm.get('task_type')!; }
  get description() { return this.carForm.get('description')!; }
  get status() { return this.carForm.get('status')!; }

  ngOnInit() {
    this.initialState.subscribe(car => {
      this.carForm = this.fb.group({
        vin: [car.vin, [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
        brand: [car.brand, [Validators.required]],
        model: [car.model, [Validators.required]],
        year_of_production: [car.year_of_production, [Validators.required, Validators.min(1950), Validators.max(currentYear)]],
        task_type: [car.task_type],
        description: [car.description],
        status: [car.status || 'Pending']
      });
    });

    this.carForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.carForm.value);
  }

  cancelEditForm() {
    this.formCancelled.emit();
  }
}