import { Component, EventEmitter, ModuleWithComponentFactories, OnInit, Output } from '@angular/core';
import * as countries from 'i18n-iso-countries'
import { hasFlag } from 'country-flag-icons'
import { LocationService } from '../service/location.service';
import { TemperatureService } from '../service/temperature.service';
import { DayTemperature } from '../model/DayTemperature';
import { SearchResultsDTO } from '../dto/SearchResultsDTO';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private locationService: LocationService, private tempService: TemperatureService) { }

  private days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  public countryCodes = Object.keys(countries.getAlpha2Codes());
  selectedCode : string = ""
  searchTerm : string = ""
  loading : boolean = false

  @Output() searchResultsEvent = new EventEmitter<SearchResultsDTO>();
  temperatures : DayTemperature[] = []

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1
   }


  getFlag(code: string) : string {
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`
  }
  hasFlag(code: string) : boolean {
    return hasFlag(code)
  }
  onSubmit() {
    if (this.loading) {
      return
    }
    this.loading = true
    this.temperatures = []

    this.tempService.getTemp7Days(this.selectedCode, this.searchTerm).then((data:any) => {
      data.daily.pop() //OpenWeather API returns current day AND 7 additional days, 8 in total
      for (let day of data.daily) {
        let dayInWeek = this.days[new Date(day.dt * 1000).getDay()]
        this.temperatures.push({day: dayInWeek, temperature: day.temp.day})
      }
      this.searchResultsEvent.emit({dayTemperatures: this.temperatures, displayName: data.displayName})
      this.loading = false
    }, () => {
      this.loading = false
    })
  }
}
