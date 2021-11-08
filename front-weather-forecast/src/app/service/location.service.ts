import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as countries from 'i18n-iso-countries'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  LocationIqURL: string = "https://eu1.locationiq.com/v1/search.php"
  // key should NOT be stored like this, but as a free key and for this use-case it should suffice
  key: string = "pk.f9971de5a5f0723a1b85387f671c4857"
  constructor(private http: HttpClient) { }

  getCoords(countryCode: string, city: string) {
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    let country = countries.getName(countryCode, "en");
    return this.http.get(this.LocationIqURL,
      {
        params: {
          key: this.key,
          country: country,
          city: city,
          format: "json"
        }
      })
  }

}
