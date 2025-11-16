import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VoteRequest } from '../../model/vote/projections/vote-count.model';
import { VoteResponse } from '../../model/vote/vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseUrl = `${environment.apiUrl}/vote`;

  constructor(private http: HttpClient) {}

  castVote(request: VoteRequest): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(this.baseUrl, request);
  }
}
