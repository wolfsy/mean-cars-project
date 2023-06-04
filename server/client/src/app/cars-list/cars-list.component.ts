import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../_model/car';
import { CarService } from '../_service/car.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DescriptionModalComponent } from '../description-modal/description-modal.component';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})

export class CarsListComponent implements OnInit {
  cars$: Observable<Car[]> = new Observable();
  modalRef?: BsModalRef;

  constructor(
    private carsService: CarService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.fetchCars();
  }

  deleteCar(id: string): void {
    this.carsService.deleteCar(id).subscribe({
      next: () => this.fetchCars()
    });
  }

  openDescriptionModal(description: string): void {
    this.modalRef = this.modalService.show(DescriptionModalComponent, {
      initialState: {
        description: description
      }
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