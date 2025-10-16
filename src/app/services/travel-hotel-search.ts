import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service'; // Token alma servisi

@Injectable({
  providedIn: 'root'
})
export class TravelHotelSearch {
  private apiUrl = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city';

  constructor(private http: HttpClient, private authService: AuthService) { }

searchHotels(cityCode: string): Observable<any> {
  return this.authService.getAccessToken().pipe(
    switchMap(token => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const params = new HttpParams()
        .set('cityCode', cityCode)
        .set('checkInDate', '2025-11-01')
        .set('checkOutDate', '2025-11-05')
        .set('adults', '2');

      return this.http.get(this.apiUrl, { headers, params });
    })
  );
}


}
