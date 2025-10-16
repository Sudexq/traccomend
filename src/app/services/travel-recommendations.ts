import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service'; // Token alma servisi

@Injectable({
  providedIn: 'root'
})
export class TravelRecommendations {
  private apiUrl = 'https://test.api.amadeus.com/v1/reference-data/recommended-locations';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecommendations(origin: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        console.log('Access Token:', token);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        // const params = new HttpParams().set('origin', origin);
        const params = new HttpParams()
          .set('cityCodes', origin)
        // .set('travelerCountryCode', 'FR'); // Örnek ülke kodu

        return this.http.get(this.apiUrl, { headers, params });
      })
    );
  }
}
