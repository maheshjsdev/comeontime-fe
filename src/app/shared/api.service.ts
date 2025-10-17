import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private basePath = 'http://localhost:10000';

    constructor(private http: HttpClient) { }
    
    commonPostWithoutToken(path: string, body: any = {}): Observable<any> {
        return this.http.post(this.buildUrl(path), body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
    commonPost(path: string, body: any = {}): Observable<any> {
        return this.http.post(this.buildUrl(path), body, {
            headers: this.buildHeaders()
        });
    }

    commonGet(path: string): Observable<any> {
        return this.http.get(this.buildUrl(path), {
            headers: this.buildHeaders()
        });
    }

    private buildUrl(path: string): string {
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        return `${this.basePath}${path}`;
    }

    private buildHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

}
