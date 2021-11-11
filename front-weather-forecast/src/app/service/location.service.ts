import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as countries from 'i18n-iso-countries'
import {config} from 'src/shared'
import { KeyDTO } from '../dto/KeyDTO';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private keyPath : string = "/keys/location-key";
  LocationIqURL: string = "https://eu1.locationiq.com/v1/search.php"
  key: string = ""
  constructor(private http: HttpClient) {
   }
  getKey(): void {
    this.http.get<KeyDTO>(`${config.baseUrl}${this.keyPath}`).subscribe((data) => {
      this.key = data.key
    })
  }
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
