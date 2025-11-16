import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReniecResponse } from '../../model/reniec/reniec.model';

@Injectable({
  providedIn: 'root',
})
export class ReniecService {
  private baseUrl = `${environment.apiUrl}/reniec`;

  constructor(private http: HttpClient) {}

  consultDni(dni: string) {
    return this.http.get<ReniecResponse>(`${this.baseUrl}/consult/${dni}`);
  }
}
