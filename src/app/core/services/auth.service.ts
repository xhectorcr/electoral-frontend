import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, RefreshRequest, RegisterRequest, SessionLogoutRequest } from '../model/auth/auth.model';
import { ApiResponse, AuthResponse } from '../model/base/base.model';

export interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/login`,
      request
    );
  }

  register(request: RegisterRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/register`,
      request
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  verifyEmail(code: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/verify?code=${code}`);
  }

  refresh(request: RefreshRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/refresh`,
      request
    );
  }

  logout(
    request: SessionLogoutRequest,
    accessToken: string
  ): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/logout`, request, {
      headers,
    });
  }

  logoutAll(accessToken: string): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/logout-all`,
      {},
      { headers }
    );
  }
}
