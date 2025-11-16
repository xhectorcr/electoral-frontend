import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCalendar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/calendar`);
  }

  getCandidates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/candidates`);
  }

  getParties(): Observable<any> {
    return this.http.get(`${this.baseUrl}/parties`);
  }
}
