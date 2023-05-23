import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url = 'http://localhost:5200';
  private cars$: Subject<Car[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshCars() {
    this.httpClient.get<Car[]>(`${this.url}/cars`)
      .subscribe(cars => {
        this.cars$.next(cars);
      });
  }

  getCars(): Subject<Car[]> {
    this.refreshCars();
    return this.cars$;
  }

  getCar(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${this.url}/cars/${id}`);
  }

  createCar(car: Car): Observable<string> {
    return this.httpClient.post(`${this.url}/cars`, car, { responseType: 'text' });
  }

  updateCar(id: string, car: Car): Observable<string> {
    return this.httpClient.put(`${this.url}/cars/${id}`, car, { responseType: 'text' });
  }

  deleteCar(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/cars/${id}`, { responseType: 'text' });
  }
}