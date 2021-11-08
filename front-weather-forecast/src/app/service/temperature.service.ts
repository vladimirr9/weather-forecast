import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayTemperature } from '../model/DayTemperature';
import { LocationService } from './location.service';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  OpenWeatherURL : string = "https://api.openweathermap.org/data/2.5/onecall"
  // key should NOT be stored like this, but as a free key and for this use-case it should suffice
  appid: string = "02e87ff3683c0f032eb705da30b5bf18"
  exclude : string = "current,minutely,hourly,alerts"
  constructor(private locationService: LocationService, private http: HttpClient) { }

  getTemp7Days(countryCode: string, city: string) : Promise<any> {
    let tmp = new Promise((resolve, reject) => {
      this.locationService.getCoords(countryCode, city).subscribe((data: any) => {
        let latitude = data[0].lat
        let longitude = data[0].lon
        let displayNameSplit = data[0].display_name.split(',')
        let displayName = displayNameSplit[0] + ', ' + displayNameSplit[displayNameSplit.length-1]
        return this.http.get(this.OpenWeatherURL, { params: {
          appid: this.appid,
          lat: latitude,
          lon: longitude,
          exclude: this.exclude,
          units: "metric"
        }}).subscribe((data:any) => {
          data.displayName = displayName
          resolve(data)
        })
      }, (err: Error) => {
        reject(err)
      })
    })
    return tmp
  }

  getAverage(temperatures : DayTemperature[]) : number {
    let sum = 0
    for (let dayTemperature of temperatures) {
      sum += dayTemperature.temperature
    }
    return sum / temperatures.length
  }
}
