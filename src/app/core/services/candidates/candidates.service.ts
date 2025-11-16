// candidate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidateRequest, CandidateResponse } from '../../model/candidates/candidates.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  createCandidate(request: CandidateRequest): Observable<CandidateResponse> {
    return this.http.post<CandidateResponse>(this.baseUrl, request);
  }

  updateCandidate(
    id: number,
    request: CandidateRequest
  ): Observable<CandidateResponse> {
    return this.http.put<CandidateResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCandidateById(id: number): Observable<CandidateResponse> {
    return this.http.get<CandidateResponse>(`${this.baseUrl}/${id}`);
  }

  getAllActiveCandidates(): Observable<CandidateResponse[]> {
    return this.http.get<CandidateResponse[]>(this.baseUrl);
  }
}
