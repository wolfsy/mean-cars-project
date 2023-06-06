import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from "../_service/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});

  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  get emailAddress() { return this.loginForm.get('emailAddress')!; }
  get password() { return this.loginForm.get('password')!; }

  ngOnInit(): void {
    const errorsSub = this.authService.loginErrors$.subscribe(
      (message: string) => this.snackBar.open(message, 'OK')
    );
    this.subs.push(errorsSub);

    this.loginForm = new FormGroup({
      emailAddress: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  submitLoginForm() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(
      this.emailAddress.value,
      this.password.value
    );
  }

  cancelLoginForm() {
    this.router.navigate(['/home']);
  }
}
