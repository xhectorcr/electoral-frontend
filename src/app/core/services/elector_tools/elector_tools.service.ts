import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ElectorRequest,
  ElectorResponse,
} from '../../model/elector_tools/elector_tools.model';

@Injectable({
  providedIn: 'root',
})
export class ElectorService {
  private baseUrl = `${environment.apiUrl}/elector-tools`;
  private adminBaseUrl = `${environment.apiUrl}/admin/electoral-roll`;

  constructor(private http: HttpClient) {}

  createElectorEntry(request: ElectorRequest): Observable<ElectorResponse> {
    return this.http.post<ElectorResponse>(`${this.adminBaseUrl}`, request);
  }

  updateElectorEntry(
    id: number,
    request: ElectorRequest
  ): Observable<ElectorResponse> {
    return this.http.put<ElectorResponse>(
      `${this.adminBaseUrl}/${id}`,
      request
    );
  }

  uploadElectoralRoll(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.adminBaseUrl}/upload-csv`, formData);
  }

  getMyVotingInfo(): Observable<ElectorResponse> {
    return this.http.get<ElectorResponse>(`${this.baseUrl}/my-info`);
  }

  getPublicVotingInfoByDni(dni: string): Observable<ElectorResponse> {
    return this.http.get<ElectorResponse>(
      `${this.baseUrl}/public/find-by-dni/${dni}`
    );
  }

  getAllTestElectors(): Observable<ElectorResponse[]> {
    return this.http.get<ElectorResponse[]>(
      `${this.baseUrl}/public/test-electors`
    );
  }
}
