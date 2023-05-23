import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars-list',
  template: `
   <h2 class="text-center m-5" style="font-weight: lighter;">All registered cars</h2>
 
   <table class="table table-bordered">
       <thead>
           <tr>
               <th>VIN</th>
               <th>Brand</th>
               <th>Model</th>
               <th>Year of Production</th>
               <th>Task Type</th>
               <th>Description</th>
               <th>Status</th>
               <th>More Options</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let car of cars$ | async" [ngClass]="getStatusClass(car.status)">
               <td>{{car.vin}}</td>
               <td>{{car.brand}}</td>
               <td>{{car.model}}</td>
               <td>{{car.year_of_production}}</td>
               <td>{{car.task_type}}</td>
               <td>{{car.description}}</td>
               <td>{{car.status}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', car._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteCar(car._id ? car._id.toString() : '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Car</button>
 `,
 styles: [
  `.form-pending {
     background-color: #F7F7F7;
   }
   
   .form-servicing {
     background-color: #F2F9FF;
   }
   
   .form-finished {
     background-color: #F2FFF7;
   }
 `
 ]
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
    }

    return '';
  }
}