import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CalendarEventRequest, CalendarEventResponse } from "../../model/calendar/calendar.model";


@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseUrl = `${environment.apiUrl}/calendar`;

  constructor(private http: HttpClient) {}

  getGeneralCalendar(): Observable<CalendarEventResponse[]> {
    return this.http.get<CalendarEventResponse[]>(`${this.baseUrl}/general`);
  }

  getPollWorkerCalendar(): Observable<CalendarEventResponse[]> {
    return this.http.get<CalendarEventResponse[]>(
      `${this.baseUrl}/poll-workers`
    );
  }

  createEvent(
    request: CalendarEventRequest
  ): Observable<CalendarEventResponse> {
    return this.http.post<CalendarEventResponse>(`${this.baseUrl}`, request);
  }

  updateEvent(
    id: number,
    request: CalendarEventRequest
  ): Observable<CalendarEventResponse> {
    return this.http.put<CalendarEventResponse>(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

