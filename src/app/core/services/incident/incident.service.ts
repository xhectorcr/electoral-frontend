import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IncidentRequest,
  IncidentResponse,
} from '../../model/incident/incident.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private baseUrl = `${environment.apiUrl}/incidents`;

  constructor(private http: HttpClient) {}

  createIncident(request: IncidentRequest): Observable<IncidentResponse> {
    return this.http.post<IncidentResponse>(`${this.baseUrl}`, request);
  }

  getIncidentsForMyTable(): Observable<IncidentResponse[]> {
    return this.http.get<IncidentResponse[]>(`${this.baseUrl}/my-table`);
  }
}
