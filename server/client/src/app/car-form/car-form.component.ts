import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../car';

const currentYear = new Date().getFullYear();

@Component({
  selector: 'app-car-form',
  template: `
    <form class="car-form" autocomplete="off" [formGroup]="carForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="vin" formControlName="vin" placeholder="vin" required>
        <label for="vin">VIN</label>
      </div>
 
      <div *ngIf="vin.invalid && (vin.dirty || vin.touched)" class="alert alert-danger">
        <div *ngIf="vin.errors?.['required']">
          VIN is required.
        </div>
        <div *ngIf="vin.errors?.['minlength']">
          VIN must contain exactly 17 characters long.
        </div>
        <div *ngIf="vin.errors?.['maxlength']">
          VIN must contain exactly 17 characters long.
        </div>
      </div>
 
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="brand" placeholder="brand" required>
        <label for="brand">Brand</label>
      </div>
 
      <div *ngIf="brand.invalid && (brand.dirty || brand.touched)" class="alert alert-danger">
        <div *ngIf="brand.errors?.['required']">
          Brand is required.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="model" placeholder="model" required>
        <label for="model">Model</label>
      </div>

      <div *ngIf="model.invalid && (model.dirty || model.touched)" class="alert alert-danger">
        <div *ngIf="model.errors?.['required']">
          Model is required.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="Number" formControlName="year_of_production" placeholder="year_of_production" required>
        <label for="year_of_production">Year of Production</label>
      </div>

      <div *ngIf="year_of_production.invalid && (year_of_production.dirty || year_of_production.touched)" class="alert alert-danger">
        <div *ngIf="year_of_production.errors?.['required']">
          Year of Production is required.
        </div>
        <div *ngIf="year_of_production.errors?.['min']">
          It is not possible to enter a vehicle that was manufactured before 1950.
        </div>
        <div *ngIf="year_of_production.errors?.['max']">
          The provided year of production cannot be greater than the current year.
        </div>
      </div>
 
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="task_type" name="task_type" id="task_type-repairing" value="Repairing" required>
          <label class="form-check-label" for="task_type-repairing">Repairing</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="task_type" name="task_type" id="task_type-varnishing" value="Varnishing">
          <label class="form-check-label" for="task_type-varnishing">Varnishing</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="task_type" name="task_type" id="task_type-cleaning" value="Cleaning">
          <label class="form-check-label" for="task_type-cleaning">Cleaning</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="task_type" name="task_type" id="task_type-other" value="Other">
          <label class="form-check-label" for="task_type-other">Other</label>
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="description" placeholder="Description">
        <label for="description">Description</label>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="status" name="status" id="status-pending" value="Pending" required>
          <label class="form-check-label" for="status-pending">Pending</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="status" name="status" id="status-servicing" value="Servicing">
          <label class="form-check-label" for="status-servicing">Servicing</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="status" name="status" id="status-finished" value="Finished">
          <label class="form-check-label" for="status-finished">Finished</label>
        </div>
      </div>
 
      <button class="btn btn-primary" type="submit" [disabled]="carForm.invalid" style="margin-right: 5px;">Add</button>
      <button class="btn btn-secondary" type="button" (click)="cancelEditForm()">Cancel</button>
    </form>
 `,
  styles: [
    `.car-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
  `
  ]
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