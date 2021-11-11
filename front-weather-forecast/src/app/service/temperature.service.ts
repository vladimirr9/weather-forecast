import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DayTemperature } from '../model/DayTemperature';
import { LocationService } from './location.service';
import { config } from 'src/shared';
import { KeyDTO } from '../dto/KeyDTO';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  OpenWeatherURL: string = "https://api.openweathermap.org/data/2.5/onecall"
  private keyPath = "/keys/weather-key"
  appid: string = ""
  exclude: string = "current,minutely,hourly,alerts"
  constructor(private locationService: LocationService, private http: HttpClient) { }

  getKey(): void {
    this.http.get<KeyDTO>(`${config.baseUrl}${this.keyPath}`).subscribe((data) => {
      this.appid = data.key
    })
  }

  getTemp7Days(countryCode: string, city: string): Promise<any> {
    let returnPromise = new Promise((resolve, reject) => {
      this.locationService.getCoords(countryCode, city).subscribe((data: any) => {
        let latitude = data[0].lat
        let longitude = data[0].lon
        let displayNameSplit = data[0].display_name.split(',')
        let displayName = displayNameSplit[0] + ', ' + displayNameSplit[displayNameSplit.length - 1]
        return this.http.get(this.OpenWeatherURL, {
          params: {
            appid: this.appid,
            lat: latitude,
            lon: longitude,
            exclude: this.exclude,
            units: "metric"
          }
        }).subscribe((data: any) => {
          data.daily.pop() //OpenWeather API returns current day AND 7 additional days, 8 in total
          let temperatures = []
          for (let day of data.daily) {
            let dayInWeek = this.days[new Date(day.dt * 1000).getDay()]
            temperatures.push({ day: dayInWeek, temperature: day.temp.day, minTemp: day.temp.min, maxTemp: day.temp.max })
          }
          resolve({ dayTemperatures: temperatures, displayName: displayName })
        })
      }, (err: Error) => {
        reject(err)
      })
    })
    return returnPromise
  }

  getAverage(temperatures: DayTemperature[]): number {
    let sum = 0
    for (let dayTemperature of temperatures) {
      sum += dayTemperature.temperature
    }
    return sum / temperatures.length
  }
}
