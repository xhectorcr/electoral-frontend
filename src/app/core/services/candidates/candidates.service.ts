// candidate.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CandidateRequest,
  CandidateResponseDTO,
} from '../../model/candidates/candidates.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  createCandidate(request: CandidateRequest): Observable<CandidateResponseDTO> {
    return this.http.post<CandidateResponseDTO>(this.baseUrl, request);
  }

  updateCandidate(
    id: number,
    request: CandidateRequest
  ): Observable<CandidateResponseDTO> {
    return this.http.put<CandidateResponseDTO>(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCandidateById(id: number): Observable<CandidateResponseDTO> {
    return this.http.get<CandidateResponseDTO>(`${this.baseUrl}/${id}`);
  }

  getAllActiveCandidates(): Observable<CandidateResponseDTO[]> {
    return this.http.get<CandidateResponseDTO[]>(this.baseUrl);
  }
}
