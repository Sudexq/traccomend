import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { FormsModule } from '@angular/forms';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, GeoapifyGeocoderAutocompleteModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements AfterViewInit {
  @Output() searchCompleted = new EventEmitter<void>();

  selectedCity: { name: string } | null = null;
  selectedCountry: { name: string } | null = null;
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
          placeholder: "Lütfen bir şehir yazınız"
        }
      );

      autocomplete.on("select", (location) => {
        if (!location || !location.properties) {
          console.warn("Geçersiz konum seçildi.");
          return;
        }

        const props = location.properties;
        console.log(location.properties)
        this.selectedCity = {
          name: props.city,
        };
      });
    }

    const elementCountry = document.getElementById("autocompleteCountry");
    if (elementCountry) {
      const autocomplete = new GeocoderAutocomplete(
        elementCountry,
        this.myAPIKey,
        {
          type: "country",
          lang: "en",
          limit: 5,
          skipDetails: true,
          skipIcons: true,
          placeholder: "Lütfen bir ülke yazınız"
        }
      );
      autocomplete.on("select", (location) => {

        if (!location || !location.properties) {
          console.warn("Geçersiz konum seçildi.");
          return;
        }

        const props = location.properties;
        console.log(location.properties)
        this.selectedCountry = {
          name: props.country_code,
        };
      });
    }
  }


  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.selectedCity) {
      alert("Lütfen bir konum seçin.");
      return;
    }

    if (!this.selectedCountry) {
      alert("Lütfen nereli olduğunuzu seçin.");
      return;
    }

    const payload = {
      location: this.selectedCity,
      travellerCountry: this.selectedCountry,
      duration: this.duration,
      budget: this.budget
    };

    console.log("API'ye gönderilecek veri:", payload);
    localStorage.setItem('travelSearchData', JSON.stringify(payload));
    this.searchCompleted.emit(); // Ana component'e bildir
  }
}