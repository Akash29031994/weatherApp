import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../../commons/models/weather';

@Component({
  selector: 'app-weather-details-table',
  templateUrl: './weather-details-table.component.html',
  styleUrls: ['./weather-details-table.component.scss']
})
export class WeatherDetailsTableComponent implements OnInit {

  @Input() weatherList: Weather[];

  constructor() { }

  ngOnInit() {
  }
}
