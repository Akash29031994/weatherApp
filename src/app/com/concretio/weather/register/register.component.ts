import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../commons/services/weather.service';
import { User, UserResponse } from '../../commons/models/user';
import { RequestService } from '../../commons/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginPath: string;
  user: User;
  confirmPassword: string;
  weatherDetailsPath: string;

  constructor(private _weatherService: WeatherService, private _requestService: RequestService) { }

  ngOnInit() {
    this.user = new User();
    this.weatherDetailsPath = '../weatherdetails';
    this.loginPath = '../login';
    if (this._weatherService.validateToken()) {
      this._weatherService.navigate(this.weatherDetailsPath);
    }
  }

  register() {
    this._requestService.postRequest('register', this.user).subscribe((response: UserResponse) => {
      this._weatherService.navigate(this.loginPath);
    }, error => {

    });
  }

  navigate(path: string) {
    this._weatherService.navigate(path);
  }

}
