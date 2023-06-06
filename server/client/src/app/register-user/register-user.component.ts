import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../_model/users';
import { UsersService } from '../_service/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html'
})

export class RegisterUserComponent {
  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  addUser(user: Users) {
    this.usersService.registerUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert("Failed to create user instance");
          console.error(error);
        }
      });
  }

  handleCancel() {
    this.router.navigate(['/home']);
  }
}
