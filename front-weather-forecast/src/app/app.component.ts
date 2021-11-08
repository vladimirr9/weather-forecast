import { Component } from '@angular/core';
import { SearchResultsDTO } from './dto/SearchResultsDTO';
import { DayTemperature } from './model/DayTemperature';
import { ColorService } from './service/color.service';
import { TemperatureService } from './service/temperature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//TODO: extract this component's content into separate component to leave app-component clean
export class AppComponent {
  constructor(private colorService: ColorService, private tempService: TemperatureService) { }
  title = 'front-weather-forecast';
  temperatures: DayTemperature[] = []
  tempAverage: number = 0
  searchDone: boolean = false
  displayName: string = ""
  backgroundGradient: string = "linear-gradient(135deg, rgba(73,158,229,0.3) 4%, rgba(169,218,251,0.3) 50%, rgba(244,214,128,0.3) 95%)"

  today: number = Date.now()
  nextWeek: number = Date.now() + 6 * 24 * 60 * 60 * 1000

  isSameMonth(time1: number, time2: number) {
    return new Date(time1).getMonth() === new Date(time2).getMonth()
  }

  isSameYear(time1: number, time2: number) {
    return new Date(time1).getFullYear() === new Date(time2).getFullYear()
  }

  updateTemperatures(results: SearchResultsDTO) {
    this.searchDone = true
    this.temperatures = results.dayTemperatures
    this.displayName = results.displayName

    this.tempAverage = this.tempService.getAverage(this.temperatures)

    this.backgroundGradient = `linear-gradient(135deg,
      ${this.colorService.getColorForTemperature(this.temperatures[0].minTemp - 8, 0.9)} 1%,
      ${this.colorService.getColorForTemperature(this.tempAverage, 0.9)} 90%)`
  }

}


