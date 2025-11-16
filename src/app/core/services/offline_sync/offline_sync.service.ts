import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfflinePackage } from '../../model/offline_sync/offline_sync.model';

@Injectable({
  providedIn: 'root',
})
export class OfflinePackageService {
  private baseUrl = `${environment.apiUrl}/offline-package`;

  constructor(private http: HttpClient) {}

  getOfflineDataPackage(): Observable<OfflinePackage> {
    return this.http.get<OfflinePackage>(this.baseUrl);
  }
}
