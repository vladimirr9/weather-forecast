import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayTemperature } from '../model/DayTemperature';
import { LocationService } from './location.service';


@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  OpenWeatherURL: string = "https://api.openweathermap.org/data/2.5/onecall"
  // key should NOT be stored like this, but as a free key and for this use-case it should suffice
  appid: string = "02e87ff3683c0f032eb705da30b5bf18"
  exclude: string = "current,minutely,hourly,alerts"
  constructor(private locationService: LocationService, private http: HttpClient) { }

  getTemp7Days(countryCode: string, city: string): Promise<any> {
    let tmp = new Promise((resolve, reject) => {
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
    return tmp
  }

  getAverage(temperatures: DayTemperature[]): number {
    let sum = 0
    for (let dayTemperature of temperatures) {
      sum += dayTemperature.temperature
    }
    return sum / temperatures.length
  }
}