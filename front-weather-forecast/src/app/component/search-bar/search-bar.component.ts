import { Component, EventEmitter, ModuleWithComponentFactories, OnInit, Output } from '@angular/core';
import * as countries from 'i18n-iso-countries'
import { hasFlag } from 'country-flag-icons'
import { LocationService } from '../../service/location.service';
import { TemperatureService } from '../../service/temperature.service';
import { DayTemperature } from '../../model/DayTemperature';
import { SearchResultsDTO } from '../../dto/SearchResultsDTO';
import { interval, Observable } from 'rxjs';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private locationService: LocationService, private tempService: TemperatureService) { }
  ngOnInit(): void {
    this.activateLiveReload()
  }


  countryCodes = Object.keys(countries.getAlpha2Codes());
  cloudIconPath = "/assets/img/climate-icon.svg"
  loadingPath = "/assets/img/loading-circle.gif"
  magGlassPath = "/assets/img/search.svg"
  selectedCode: string = ""
  searchTerm: string = ""
  loading: boolean = false
  error: boolean = false
  searchDone: boolean = false
  lastUsedCode : string = ""
  lastUsedSearchTerm: string = ""
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

    this.getAndEmit(this.selectedCode, this.searchTerm);
  }

  private getAndEmit(selectedCode: string, searchTerm: string) {
    this.tempService.getTemp7Days(selectedCode, searchTerm).then((data: SearchResultsDTO) => {
      this.searchResultsEvent.emit({ dayTemperatures: data.dayTemperatures, displayName: data.displayName });
      this.loading = false;
      this.lastUsedCode = selectedCode
      this.lastUsedSearchTerm = searchTerm
      this.searchDone = true;

    }, () => {
      this.loading = false;
      this.error = true;
    });
  }

  private activateLiveReload() {
    interval(1000 * 60 * 15).subscribe(x => {
      if (this.searchDone) {
        this.getAndEmit(this.lastUsedCode, this.lastUsedSearchTerm);
      }
    });
  }
}
