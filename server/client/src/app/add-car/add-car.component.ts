import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html'
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