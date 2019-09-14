import { Component } from '@angular/core';
import { WeatherService } from './com/concretio/commons/services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';
  imagePath = '../assets/images/concertio logo.png';
  signOutFlag = false;

  constructor(private _weatherService: WeatherService) {
    this.signOutFlag = this._weatherService.validateToken();
  }

  signOut() {
    this._weatherService.signOut();
    this._weatherService.navigate('../login');
  }

}
