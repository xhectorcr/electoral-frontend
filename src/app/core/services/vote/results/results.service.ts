import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultsResponse } from 'src/app/core/model/vote/results/results.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private baseUrl = `${environment.apiUrl}/results`;

  constructor(private http: HttpClient) {}

  getResults(): Observable<ResultsResponse> {
    return this.http.get<ResultsResponse>(`${this.baseUrl}`);
  }

  publishResults(): Observable<ResultsResponse> {
    return this.http.post<ResultsResponse>(`${this.baseUrl}/publish`, {});
  }
}
