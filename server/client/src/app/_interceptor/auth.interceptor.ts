import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { AuthService } from "../_service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes(`http://localhost:5200`))
            return next.handle(req);

        const userInfo = JSON.parse(localStorage.getItem('automotiveWorkshopApp') ?? '{}');
        const token = userInfo?.token;

        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `${token}`)
            });
        }

        return next.handle(req).pipe(
            catchError(
                err => {
                    if (err.status === 401 || err.status === 403) {
                        this.authService.logout();
                        this.router.navigate(['login']);
                    }
                    return throwError(err);
                }
            )
        );
    }

}
