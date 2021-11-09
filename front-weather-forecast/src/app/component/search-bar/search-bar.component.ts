import { Component, EventEmitter, ModuleWithComponentFactories, OnInit, Output } from '@angular/core';
import * as countries from 'i18n-iso-countries'
import { hasFlag } from 'country-flag-icons'
import { LocationService } from '../../service/location.service';
import { TemperatureService } from '../../service/temperature.service';
import { DayTemperature } from '../../model/DayTemperature';
import { SearchResultsDTO } from '../../dto/SearchResultsDTO';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private locationService: LocationService, private tempService: TemperatureService) { }

  countryCodes = Object.keys(countries.getAlpha2Codes());
  cloudIconPath = "/assets/img/climate-icon.svg"
  loadingPath = "/assets/img/loading-circle.gif"
  magGlassPath = "/assets/img/search.svg"
  selectedCode: string = ""
  searchTerm: string = ""
  loading: boolean = false
  error: boolean = false
  //TODO: ERROR HANDLING

  @Output() searchResultsEvent = new EventEmitter<SearchResultsDTO>();

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.toLocaleLowerCase().indexOf(term) > -1
  }


  getFlag(code: string): string {
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`
  }
  //TODO: properly relocate links to assets and implement a form of lazy loading
  hasFlag(code: string): boolean {
    return hasFlag(code)
  }
  onSubmit() {
    if (this.loading || !this.selectedCode) {
      return
    }
    this.loading = true
    this.error = false

    this.tempService.getTemp7Days(this.selectedCode, this.searchTerm).then((data: SearchResultsDTO) => {
      this.searchResultsEvent.emit({ dayTemperatures: data.dayTemperatures, displayName: data.displayName })
      this.loading = false
    }, () => {
      this.loading = false
      this.error = true
    })
  }
}
