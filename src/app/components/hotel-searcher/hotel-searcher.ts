import { Component, OnInit } from '@angular/core';
import { TravelHotelSearch } from '../../services/travel-hotel-search';

@Component({
  selector: 'app-hotel-searcher',
  templateUrl: './hotel-searcher.html',
  styleUrls: ['./hotel-searcher.css']
})
export class HotelSearcher implements OnInit {
  hotels: any[] = [];

  constructor(private hotelService: TravelHotelSearch) {}

  ngOnInit() {
    this.hotelService.searchHotels('IST').subscribe({
      next: (res) => {
        this.hotels = res.data;
        console.log('Hotel Data:', this.hotels);
      },
      error: (err) => {
        console.error('Hotel API Error:', err);
      }
    });
  }
}
