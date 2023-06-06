import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Users } from "../_model/users"
import { Car } from "../_model/car";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user!: Users;

  userCars: Car[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Users>(`http://localhost:5200/users/session`).subscribe(
      response => {
        this.user = response;
        this.userCars = this.user?.cars || [];
        this.userCars.sort((a, b) => b.year_of_production - a.year_of_production);
      },
      error => {
        console.error(error);
        if (error.status === 401) {
          console.error('Authorization token is required.')
        } else if (error.status === 404) {
          console.error('User not found.');
        } else {
          console.error('Server error.');
        }
      }
    );
  }
}
