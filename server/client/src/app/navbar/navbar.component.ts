import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  token!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      user => {
        this.token = user.token;
        console.log(user);
      }
    );
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.authService.logout();
  }
}
