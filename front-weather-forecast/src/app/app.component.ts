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
export class AppComponent {
  title = 'front-weather-forecast';
}


