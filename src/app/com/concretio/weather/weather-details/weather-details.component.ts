import { Component, OnInit } from '@angular/core';
import { Weather, WeatherRequest, WeatherResponse } from '../../commons/models/weather';
import { RequestService } from '../../commons/services/request.service';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../../commons/services/weather.service';

declare var jsPDF: any;

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  weatherList: Weather[];
  weatherRequest: WeatherRequest;
  constans: any;
  mapDetails: any;
  showMessage = false;
  apiResponseError = false;
  fieldsDisabled = true;
  maxDate: Date;

  constructor(private _requestService: RequestService, private _weatherService: WeatherService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.fieldsDisabled = false;
    this.showMessage = false;
    this.apiResponseError = false;
    this.mapDetails = new Object();
    this.mapDetails.lon = '';
    this.mapDetails.lat = '';
    this.constans = require('../../commons/constants/constants.json');
    this.weatherList = [];
    this.formIntialise();
  }

  formIntialise() {
    this.weatherRequest = new WeatherRequest();
    this.weatherRequest.city = '';
    this.weatherRequest.countryCode = '';
    this.weatherRequest.fromDate = null;
    this.weatherRequest.toDate = null;
  }

  getWeatherDetails() {
    this.showMessage = false;
    this.apiResponseError = false;
    if (this.validateForm()) {
      this._requestService.postRequest('getWeatherDetails', this.weatherRequest).subscribe((response: WeatherResponse) => {
        this.weatherList = response.data;
        this.fieldsDisabled = true;
      }, error => {
        this.apiResponseError = false;
        window.scroll(0, 0);
      });
    } else {
      this.showMessage = true;
      window.scroll(0, 0);
    }
  }

  clear() {
    this.fieldsDisabled = false;
    this.apiResponseError = false;
    this.showMessage = false;
    this.weatherList = [];
    this.formIntialise();
  }

  getLocation() {
    this.apiResponseError = false;
    const url = environment.externalAPI + this.weatherRequest.city + ',' + this.weatherRequest.countryCode + '&appid='
      + this.constans.keys.open_weather_api_key;
    this._requestService.externalGetRequest(url).subscribe((response: any) => {
      this.mapDetails.lon = response.coord.lon;
      this.mapDetails.lat = response.coord.lat;
      this._weatherService.setMapDetails(this.mapDetails);
      this._weatherService.navigate('../weathermap');
    }, error => {
      this.apiResponseError = false;
      window.scroll(0, 0);
    });
  }

  saveWeatherDetails() {
    this.showMessage = false;
    this.apiResponseError = false;
    if (this.validateForm()) {
      this._requestService.postRequest('saveWeatherDetails', this.weatherList).subscribe(response => {

      }, error => {
        this.apiResponseError = false;
        window.scroll(0, 0);
      });
    } else {
      this.showMessage = true;
      window.scroll(0, 0);
    }
  }

  validateForm(): boolean {
    let flag = true;
    Object.keys(this.weatherRequest).forEach(key => {
      if (!this.weatherRequest[key] || this.weatherRequest[key] === undefined || this.weatherRequest[key] === null
        || this.weatherRequest[key] === '') {
        flag = false;
      }
    });
    if (flag) {
      const fromDateTime = new Date(this.weatherRequest.fromDate).getTime();
      const toDateTime = new Date(this.weatherRequest.toDate).getTime();
      if (toDateTime < fromDateTime) {
        flag = false;
      }
    }
    return flag;
  }

  downLoadPDF() {
    const docHeaderText = 'Weather Report - ' + this.weatherRequest.city + '(' + this.weatherRequest.countryCode + ')';
    const fileName = 'weather-report-' + this.weatherRequest.city + '-' + this.weatherRequest.countryCode + '-' + new Date() + '.pdf';
    const doc = new jsPDF('p', 'pt');
    const res = doc.autoTableHtmlToJson(document.getElementById('basic-table'));
    const header = function(data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text(docHeaderText, data.settings.margin.left, 50);
    };
    const options = {
      didDrawPage: header,
      margin: {
        top: 80
      }
    };
    doc.autoTable(res.columns, res.data, options);
    doc.save(fileName);
  }
}
