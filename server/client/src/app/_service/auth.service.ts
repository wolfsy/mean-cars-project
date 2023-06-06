import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AppUser } from "../app.user";
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthService {
    private url = 'http://localhost:5200/users';
    private loggedInUserSubject: BehaviorSubject<AppUser>;
    private loginErrorsSubject: Subject<string>;

    constructor(private httpClient: HttpClient,
        private router: Router) {
        const localUserData: any = JSON.parse(localStorage.getItem('automotiveWorkshopApp') ?? '{}');
        const user: AppUser = {
            token: localUserData?.token ?? '',
            userId: localUserData?.userId ?? '',
            expiresAt: localUserData?.expiresAt ?? -1
        };

        this.loggedInUserSubject = new BehaviorSubject<AppUser>(user);
        this.loginErrorsSubject = new Subject();
    }

    login(emailAddress: string, password: string) {
        this.httpClient.post(`${this.url}/login`, { emailAddress: emailAddress, password: password }, { responseType: 'text' })
            .pipe(
                catchError((error) => {
                    let errorMessage = 'Could not log in.';
                    if (error.status === 401) {
                        errorMessage = 'Invalid credentials.';
                    } else if (error.status === 500) {
                        errorMessage = 'Server error.';
                    }
                    this.loginErrorsSubject.next(errorMessage);
                    return throwError(errorMessage);
                })
            )
            .subscribe(
                (token) => {
                    this.setToken(token);
                    this.showLoginSuccessAlert();
                    this.router.navigate(['/home']);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    private setToken(token: string) {
        const claims = token.split('.')[2];
        const decodedClaims = JSON.parse(window.atob(claims));
        const user: AppUser = {
            token: token,
            userId: decodedClaims?.userId ?? '',
            expiresAt: decodedClaims?.expiresAt ?? -1
        };
        this.loggedInUserSubject.next(user);
        localStorage.setItem('automotiveWorkshopApp', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('automotiveWorkshopApp');
        this.loggedInUserSubject.next(
            {
                token: '',
                userId: '',
                expiresAt: -1
            }
        );
        this.router.navigate(['/home']);
    }

    get currentUser$(): Observable<AppUser> {
        return this.loggedInUserSubject.asObservable();
    }

    get loginErrors$(): Observable<string> {
        return this.loginErrorsSubject.asObservable();
    }

    private showLoginSuccessAlert() {
        alert('User successfully logged in!');
    }

    private showLogoutSuccessAlert() {
        alert('User successfullu logged out!');
    }
}
