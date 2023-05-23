import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  template: `
   <h2 class="text-center m-5" style="font-weight: lighter;">Provide vehicle particulars below</h2>
   <app-car-form (formSubmitted)="addCar($event)" (formCancelled)="handleCancel()"></app-car-form>
 `
})
export class AddCarComponent {
  constructor(
    private router: Router,
    private carService: CarService
  ) { }

  addCar(car: Car) {
    this.carService.createCar(car)
      .subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          alert("Failed to create car instance");
          console.error(error);
        }
      });
  }

  handleCancel() {
    this.router.navigate(['/cars']);
  }
}