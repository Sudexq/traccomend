import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TravelHotelSearch {
  private hotelIdUrl = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city';
  private hotelOffersUrl = 'https://test.api.amadeus.com/v3/shopping/hotel-offers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHotelIds(cityCode: string): Observable<string[]> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const params = new HttpParams().set('cityCode', cityCode);
        return this.http.get<any>(this.hotelIdUrl, { headers, params }).pipe(
          map(res => res.data.map((hotel: any) => hotel.hotelId))
        );
      })
    );
  }

  searchHotelOffers(hotelIds: string[]): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const params = new HttpParams()
          .set('hotelIds', hotelIds.slice(0, 10).join(',')) // max 10 ID önerilir
          .set('checkInDate', '2025-11-01')
          .set('checkOutDate', '2025-11-05')
          .set('adults', '2');

        return this.http.get(this.hotelOffersUrl, { headers, params });
      })
    );
  }
}