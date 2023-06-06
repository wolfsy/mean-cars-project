import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../_model/users';
import { UsersService } from '../_service/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html'
})

export class RegisterUserComponent {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) { }

  addUser(user: Users) {
    this.usersService.registerUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.showSuccessNotification('User registration successful!');
        },
        error: (error) => {
          if (error.status === 403) {
            alert('User with given e-mail address already exists.');
          } else {
            alert('Failed to create user instance');
            console.error(error);
          }
        }
      });
  }

  showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  handleCancel() {
    this.router.navigate(['/home']);
  }
}
