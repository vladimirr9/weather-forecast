import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-temperature-display',
  templateUrl: './day-temperature-display.component.html',
  styleUrls: ['./day-temperature-display.component.css']
})
export class DayTemperatureDisplayComponent implements OnInit {

  constructor() { }

  @Input() dayInWeek : string = ""
  @Input() temperature : number = 0
  ngOnInit(): void {
  }

}
