import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements AfterViewInit {
  @Output() searchCompleted = new EventEmitter<void>();

  selectedLocation: { lat: number, lon: number, name: string } | null = null;
  duration: number = 0;
  budget: number = 0;
  myAPIKey: string = "d0ae250233094b6facea17e9f0bf5483";

  ngAfterViewInit(): void {
    const element = document.getElementById("autocomplete");
    if (element) {
      const autocomplete = new GeocoderAutocomplete(
        element,
        this.myAPIKey,
        {
          type: "city",
          lang: "en",
          limit: 5,
          skipDetails: true,
          skipIcons: true,
          placeholder: " " // sadece 5 öneri göster
        }
      );

      autocomplete.on("select", (location) => {

        if (!location || !location.properties) {
          console.warn("Geçersiz konum seçildi.");
          return;
        }

        const selectedPlace = location.properties;
        console.log("Seçilen yer:", selectedPlace.city);
        console.log("Koordinatlar:", selectedPlace.lat, selectedPlace.lon);

        const props = location.properties;
        console.log(location.properties)
        this.selectedLocation = {
          lat: props.lat,
          lon: props.lon,
          name: props.city,
        };
      });
    }

    
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.selectedLocation) {
      alert("Lütfen bir konum seçin.");
      return;
    }

    const payload = {
      location: this.selectedLocation,
      duration: this.duration,
      budget: this.budget
    };

    console.log("API'ye gönderilecek veri:", payload);
    localStorage.setItem('travelSearchData', JSON.stringify(payload));
    this.searchCompleted.emit(); // Ana component'e bildir
  }
}