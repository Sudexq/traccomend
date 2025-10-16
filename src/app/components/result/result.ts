import { Component, OnInit } from '@angular/core';
import { TravelRecommendations } from '../../services/travel-recommendations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result implements OnInit {
  recommendations: any[] = [];
  fetchRecommendations() {
  const storedData = localStorage.getItem("travelSearchData");

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    const city = parsedData?.location?.name ?? '';
    const country = parsedData?.travellerCountry?.name ?? parsedData?.travellerCountry ?? 'FR';

    console.log('Şehir:', city);
    console.log('Ülke:', country);

    if (city && country) {
      this.travelService.getRecommendations(city.slice(0, 3).toUpperCase(), country.toUpperCase()).subscribe({
        next: (data) => {
          this.recommendations = data.data;
          console.log(this.recommendations);
        },
        error: (err) => {
          console.error('API hatası:', err);
        }
      });
    } else {
      console.warn('Şehir veya ülke bilgisi eksik.');
    }
  }
}
  constructor(private travelService: TravelRecommendations) { }
  ngOnInit(): void {
    const storedData = localStorage.getItem("travelSearchData");
    console.log(storedData)
    this.fetchRecommendations();
  }
}
