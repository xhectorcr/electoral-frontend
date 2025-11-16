import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  SessionLogoutRequest,
} from '../../model/auth/auth.model';
import { ApiResponse, AuthResponse } from '../../model/base/base.model';
import { UserProfileResponse } from '../../model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<UserProfileResponse | null>(
    null
  );

  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'userProfile';

  constructor(private http: HttpClient) {
    this.loadSessionFromStorage();
  }

  private loadSessionFromStorage() {
    const token = this.getToken();
    const user = this.getUserProfile();
    if (token && user) {
      this.currentUserSubject.next(user);
    }
  }

  public get currentUserValue(): UserProfileResponse | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public hasRole(roleName: string): boolean {
    const user = this.currentUserValue;
    if (!user || !user.roles) {
      return false;
    }
    const normalizedRole = roleName.startsWith('ROLE_')
      ? roleName
      : `ROLE_${roleName}`;
    return user.roles.includes(normalizedRole);
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.baseUrl}/auth/login`, request)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this.setSession(res.data);
          }
        })
      );
  }

  private setSession(authResponse: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, authResponse.accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));

    this.currentUserSubject.next(authResponse.user);
  }

  private clearSession() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.currentUserSubject.next(null);
  }

  logoutAll(accessToken: string): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http
      .post<ApiResponse<any>>(
        `${this.baseUrl}/auth/logout-all`,
        {},
        { headers }
      )
      .pipe(
        tap(() => {
          this.clearSession();
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserProfile(): UserProfileResponse | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user) as UserProfileResponse;
    }
    return null;
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  removeToken() {
    this.clearSession();
  }

  register(request: RegisterRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/auth/register`,
      request
    );
  }

  verifyEmail(code: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/auth/verify?code=${code}`);
  }

  refresh(request: RefreshRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/auth/refresh`,
      request
    );
  }

  logout(
    request: SessionLogoutRequest,
    accessToken: string
  ): Observable<ApiResponse<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http
      .post<ApiResponse<any>>(`${this.baseUrl}/auth/logout`, request, {
        headers,
      })
      .pipe(
        tap(() => {
          this.clearSession();
        })
      );
  }
}
