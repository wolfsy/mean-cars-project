import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Users } from '../_model/users';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private url = 'http://localhost:5200/users';
    private users$: Subject<Users[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    registerUser(user: Users) {
        return this.httpClient.post(`${this.url}/register`, user);
    }

    loginUser(credentials: any) {
        return this.httpClient.post(`${this.url}/login`, credentials);
    }

    getSession() {
        return this.httpClient.get(`${this.url}/session`);
    }

    logoutUser() {
        return this.httpClient.post(`${this.url}/logout`, {});
    }

    changePassword(passwords: any) {
        return this.httpClient.post(`${this.url}/change-password`, passwords);
    }
}