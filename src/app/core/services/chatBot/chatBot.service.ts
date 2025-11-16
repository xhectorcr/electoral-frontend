import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRequest, ChatResponse } from '../../model/chatBot/chatBot.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = `${environment.apiUrl}/chatbot`;

  constructor(private http: HttpClient) {}

  preguntar(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/preguntar`, request);
  }
}
