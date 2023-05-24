import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})

export class CarsListComponent implements OnInit {
  cars$: Observable<Car[]> = new Observable();

  constructor(private carsService: CarService) { }

  ngOnInit(): void {
    this.fetchCars();
  }

  deleteCar(id: string): void {
    this.carsService.deleteCar(id).subscribe({
      next: () => this.fetchCars()
    });
  }

  private fetchCars(): void {
    this.cars$ = this.carsService.getCars();
  }

  getStatusClass(status: string): string {
    if (status === 'Pending') {
      return 'form-pending';
    } else if (status === 'Servicing') {
      return 'form-servicing';
    } else if (status === 'Finished') {
      return 'form-finished';
    } else if (status === 'Postponed') {
      return 'form-postponed';
    }

    return '';
  }
}