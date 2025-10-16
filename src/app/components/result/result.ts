import { Component, OnInit } from '@angular/core';
import { TravelRecommendations } from '../../services/travel-recommendations';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result implements OnInit {
  constructor(private travelService: TravelRecommendations) { }
  ngOnInit(): void {
    const storedData = localStorage.getItem("travelSearchData");
    console.log(storedData)
    this.travelService.getRecommendations('MIL').subscribe(response => {
      console.log(response.data); // Burada veri geliyor mu?
    });

  }

  recommendations: string[] = [];

  fetchRecommendations() {
    const storedData = localStorage.getItem("travelSearchData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      let city: string = parsedData.location.name;

      this.travelService.getRecommendations(city.slice(0, 3).toLocaleUpperCase()).subscribe(data => {
        this.recommendations = data.data;
        console.log(this.recommendations)
      });
    }
  }

}
