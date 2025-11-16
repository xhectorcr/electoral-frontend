import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../../model/news/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get<NewsResponse[]>(`${this.baseUrl}`);
  }
}
