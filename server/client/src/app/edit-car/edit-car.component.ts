import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car.component.ts',
  templateUrl: './edit-car.component.html'
})

export class EditCarComponent implements OnInit {
  car: BehaviorSubject<Car> = new BehaviorSubject<Car>({} as Car);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.carService.getCar(id!).subscribe((car) => {
      this.car.next(car);
    });
  }

  editCar(car: Car) {
    this.carService.updateCar(this.car.value._id!.toString(), car)
      .subscribe({
        next: () => {
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          alert('Failed to update car instance.');
          console.error(error);
        }
      })
  }

  handleCancel() {
    this.router.navigate(['/cars']);
  }
}