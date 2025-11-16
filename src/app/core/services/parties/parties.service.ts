import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartyRequest, PartyResponse } from '../../model/parties/parties.model';

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  private baseUrl = `${environment.apiUrl}/parties`;

  constructor(private http: HttpClient) {}

  getAllParties(): Observable<PartyResponse[]> {
    return this.http.get<PartyResponse[]>(this.baseUrl);
  }

  getPartyById(id: number): Observable<PartyResponse> {
    return this.http.get<PartyResponse>(`${this.baseUrl}/${id}`);
  }

  createParty(request: PartyRequest): Observable<PartyResponse> {
    return this.http.post<PartyResponse>(this.baseUrl, request);
  }

  updateParty(id: number, request: PartyRequest): Observable<PartyResponse> {
    return this.http.put<PartyResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteParty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
