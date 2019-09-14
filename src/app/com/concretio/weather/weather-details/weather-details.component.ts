import { Component, OnInit } from '@angular/core';
import { Weather, WeatherRequest, WeatherResponse } from '../../commons/models/weather';
import { RequestService } from '../../commons/services/request.service';

declare var jsPDF: any;

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  countries: any[];
  weatherList: Weather[];
  weatherRequest: WeatherRequest;
  constans: any;

  constructor(private _requestService: RequestService) { }

  ngOnInit() {
    this.countries = [];
    this.constans = require('../../commons/constants/constants.json');
    this.countries = this.constans.countries;
    this.weatherList = [];
    this.weatherRequest = new WeatherRequest();
  }

  getWeatherDetails() {
    this._requestService.postRequest('getWeatherDetails' , this.weatherRequest).subscribe((response: WeatherResponse) => {
      this.weatherList = response.data;
    }, error => {

    });
  }

  saveWeatherDetails() {
    this._requestService.postRequest('saveWeatherDetails', this.weatherList).subscribe(response => {

    }, error => {

    });
  }

  downLoadPDF() {
    let doc = new jsPDF('p', 'pt');
  
    let res = doc.autoTableHtmlToJson(document.getElementById('basic-table'));
  
    let header = function(data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Weather Report", data.settings.margin.left, 50);
    };
  
    let options = {
      didDrawPage: header,
      margin: {
        top: 80
      }
    };
  
    doc.autoTable(res.columns, res.data, options);
  
    doc.save("weather-report.pdf");
  }
}
