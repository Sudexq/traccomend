import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  private clientId = '51Yp42nL7wUYIRpTexmnvSO0XNb42p20';
  private clientSecret = '9Lze2Up0Xym2Gt4v';

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<string> {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post<any>(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(map(res => res.access_token));
  }
}