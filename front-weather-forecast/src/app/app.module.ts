import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DayTemperatureDisplayComponent } from './component/day-temperature-display/day-temperature-display.component';
import { WeatherForecastComponent } from './component/weather-forecast/weather-forecast.component';
import { TemperatureService } from './service/temperature.service';
import { LocationService } from './service/location.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DayTemperatureDisplayComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TemperatureService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
