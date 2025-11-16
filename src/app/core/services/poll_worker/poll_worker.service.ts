import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AssignWorkerRequest,
  PollWorkerResponse,
} from '../../model/poll_worker/poll_worker.model';

@Injectable({
  providedIn: 'root',
})
export class PollWorkerService {
  private baseUrl = `${environment.apiUrl}/poll-worker`;

  constructor(private http: HttpClient) {}

  getMyPollWorkerInfo(): Observable<PollWorkerResponse> {
    return this.http.get<PollWorkerResponse>(`${this.baseUrl}/me`);
  }

  assignPollWorker(
    request: AssignWorkerRequest
  ): Observable<PollWorkerResponse> {
    return this.http.post<PollWorkerResponse>(
      `${this.baseUrl}/assign`,
      request
    );
  }
}
