import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TrainingMaterialRequest,
  TrainingMaterialResponse,
  WorkerTaskRequest,
  WorkerTaskResponse,
} from '../../model/poll_worker/poll_worker.model';

@Injectable({
  providedIn: 'root',
})
export class PollWorkerAdminService {
  private baseUrl = `${environment.apiUrl}/admin/poll-worker`;

  constructor(private http: HttpClient) {}

  createTask(request: WorkerTaskRequest): Observable<WorkerTaskResponse> {
    return this.http.post<WorkerTaskResponse>(`${this.baseUrl}/tasks`, request);
  }

  getAllTasks(): Observable<WorkerTaskResponse[]> {
    return this.http.get<WorkerTaskResponse[]>(`${this.baseUrl}/tasks`);
  }

  updateTask(
    id: number,
    request: WorkerTaskRequest
  ): Observable<WorkerTaskResponse> {
    return this.http.put<WorkerTaskResponse>(
      `${this.baseUrl}/tasks/${id}`,
      request
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }

  createTraining(
    request: TrainingMaterialRequest
  ): Observable<TrainingMaterialResponse> {
    return this.http.post<TrainingMaterialResponse>(
      `${this.baseUrl}/trainings`,
      request
    );
  }

  getAllTrainings(): Observable<TrainingMaterialResponse[]> {
    return this.http.get<TrainingMaterialResponse[]>(
      `${this.baseUrl}/trainings`
    );
  }

  updateTraining(
    id: number,
    request: TrainingMaterialRequest
  ): Observable<TrainingMaterialResponse> {
    return this.http.put<TrainingMaterialResponse>(
      `${this.baseUrl}/trainings/${id}`,
      request
    );
  }

  deleteTraining(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trainings/${id}`);
  }
}
