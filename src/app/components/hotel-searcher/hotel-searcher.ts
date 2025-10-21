import { Component, OnInit } from '@angular/core';
import { TravelHotelSearch } from '../../services/travel-hotel-search';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-searcher',
  standalone: true,
  templateUrl: './hotel-searcher.html',
  styleUrls: ['./hotel-searcher.css'],
  imports: [CommonModule]
})
export class HotelSearcher implements OnInit {
  hotels: any[] = [];

  constructor(private hotelService: TravelHotelSearch) {}

  ngOnInit() {
    this.hotelService.getHotelIds('PAR').pipe(
      switchMap(ids => this.hotelService.searchHotelOffers(ids))
    ).subscribe({
next: (res) => {
  console.log('Full API Response:', res);
 // this.hotels = res.data ?? [];

 const raw = res.data ?? [];

// Remove after you done. 
 if (raw.length) {
  console.log("Hotel raw item: " , raw[0])
  console.log("Hotel Key: ", Object.keys(raw[0]))
 }

 // Hotel Infos
  this.hotels = raw.map((item: { hotel: any; hotelRecord: any; name: any; hotelId: any; id: any; dupeId: any; chainCode: any; cityCode: any; address: { cityCode: any; }; geoCode: { latitude: any; longitude: any; }; latitude: any; longitude: any; }) => {
    const h = item.hotel ?? item.hotelRecord ?? item;

    return {
      name: h.name ?? item.name,
      hotelId: h.hotelId ?? h.id ?? item.hotelId ?? item.id,
      dupeId: item.dupeId ?? h.dupeId ?? null,
      chainCode: h.chainCode ?? item.chainCode ?? null,
      cityCode: item.cityCode ?? item.address?.cityCode ?? null,
      latitude: h.latitude ?? item.geoCode?.latitude ?? item.latitude ?? null,
      longitude: h.longitude ?? item.geoCode?.longitude ?? item.longitude ?? null,
      raw: item
    };
  });

},
      error: (err) => {
        console.error('Hotel API Error:', err);
      }
    });
}


}