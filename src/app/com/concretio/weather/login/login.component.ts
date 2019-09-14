import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../commons/services/weather.service';
import { UserLogin,LoginResponse } from '../../commons/models/user';
import { RequestService } from '../../commons/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  imgPath: string;
  registerPath: string;
  userLogin: UserLogin;
  weatherDetailsPath: string;

  constructor(private _weatherService: WeatherService, private _requestService: RequestService) { }
  RequestService
  ngOnInit() {
    this.imgPath = '../../../../../assets/images/img_avatar2.png';
    this.registerPath = '../register';
    this.weatherDetailsPath = '../weatherdetails';
    this.userLogin = new UserLogin();
    if (this._weatherService.validateToken()) {
      this._weatherService.navigate(this.weatherDetailsPath);
    }
  }

  navigate(path: string) {
    this._weatherService.navigate(path);
  }

  login() {
    this._requestService.postRequest('login', this.userLogin).subscribe((response: LoginResponse) => {
      if (response.jwttoken && response.jwttoken !== null && response.jwttoken !== undefined && response.jwttoken !== '') {
        localStorage.setItem('JWTToken', response.jwttoken);
        this._weatherService.navigate(this.weatherDetailsPath);
      }
    }, error => {

    });
  }
}
