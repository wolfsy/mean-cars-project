import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Subsidiary } from '../_model/subsidiary';

@Injectable({
    providedIn: 'root'
})

export class SubsidiaryService {
    private url = 'http://localhost:5200';
    private subsidiaries$: Subject<Subsidiary[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshSubsidiaries() {
        this.httpClient.get<Subsidiary[]>(`${this.url}/subsidiaries`)
            .subscribe(subsidiaries => {
                this.subsidiaries$.next(subsidiaries);
            });
    }

    getSubsidiaries(): Subject<Subsidiary[]> {
        this.refreshSubsidiaries();
        return this.subsidiaries$;
    }

    getSubsidiary(id: string): Observable<Subsidiary> {
        return this.httpClient.get<Subsidiary>(`${this.url}/subsidiaries/${id}`);
    }

    createSubsidiary(subsidiary: Subsidiary): Observable<string> {
        return this.httpClient.post(`${this.url}/subsidiaries`, subsidiary, { responseType: 'text' });
    }

    updateSubsidiary(id: string, subsidiary: Subsidiary): Observable<string> {
        return this.httpClient.put(`${this.url}/subsidiaries/${id}`, subsidiary, { responseType: 'text' });
    }

    deleteSubsidiary(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/subsidiaries/${id}`, { responseType: 'text' });
    }
}